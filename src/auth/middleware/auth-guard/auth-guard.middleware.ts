import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { Request } from 'src/auth/dto/request-auth';
import { UserTfaDto } from 'src/auth/dto/usertfa-dto';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';
import Usuario from 'src/common/database/models/usuario.model';

@Injectable()
export class AuthGuardMiddleware implements NestMiddleware<Request, Response> {

  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
    private jwtService: JwtService
  ) { }

  async use(req: Request, res: Response, next: () => void) {
    // Get token from request headers
    const [type, token] = (req?.headers['authorization'] ?? '').split(' ');

    if (!token || type.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException({
        message: 'Token no proporcionado o en formato incorrecto.'
      });
    }

    const datosJwt = this.jwtService.decode(token) as UserTfaDto;

    // Ger user from token in DispositivoVinclulado
    const user = await this.usuarioModel.findOne({
      where: {
        id: datosJwt.id,
      },
      include: [{
        model: DispositivoVinculado,
        where: {
          id: datosJwt.idDispositivo
        }
      }]
    });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Usuario no encontrado.'
      });
    }

    // Injec in request
    req.token = token;
    req.usuario = user;
    req.jwtData = datosJwt;

    return next();
  }
}
