import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDto } from './dto/auth-dto';
import { TfaService } from './services/tfa.service';
import { TfaVertifyDto } from './dto/tfa-vertify-dto';
import { Request } from './dto/request-auth';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService, private tfaService: TfaService) {}

  @Post()
  async auth(@Body() authUser: AuthDto) {
    const usuario = await this.authService.auth(authUser);

    const dispositivo = await this.authService.vincularDispositivo(
      usuario,
      authUser.nombreDispositivo
    );

    if (usuario.tfaRequerido) {
      await this.tfaService.sendTfaCode(usuario.id, dispositivo.id);
    }

    return {
      usuario,
      dispositivo,
    };
  }

  @Post('verify-tfa')
  async verifyTfa(
    @Body() userTfa: TfaVertifyDto,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const jwtData = request?.jwtData;

    const isValid = await this.tfaService.verifyTfaCode(
      jwtData.id,
      jwtData.idDispositivo,
      userTfa.codigo
    );

    if (!isValid) {
      throw new UnauthorizedException({
        message: 'El código de verificación es incorrecto.',
      });
    }

    const dispositivo = await this.authService.actualizarTokenDispositivo(
      jwtData.idDispositivo,
      request.token,
      isValid
    );

    return response.json({
      usuario: { ...jwtData, tfaPasado: isValid },
      dispositivo,
    });
  }

  @Delete('logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    const jwtData = request?.jwtData;

    await this.authService.logout(jwtData.id, jwtData.idDispositivo);

    return response.json({
      message: 'Sesión cerrada correctamente.',
    });
  }

  @Delete('disabled-tfa')
  async disabledTfa(@Req() request: Request, @Res() response: Response) {
    const jwtData = request?.jwtData;

    await this.tfaService.disableTfa(jwtData.id);

    return response.json({
      message: 'Autenticación de dos factores deshabilitada correctamente.',
    });
  }
}
