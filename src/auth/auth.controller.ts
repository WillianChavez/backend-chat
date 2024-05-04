import { Body, Controller, Get, Res, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth-dto";

@Controller({
  path: 'auth',
})
export class AuthController {

  constructor(private authService: AuthService) { }

  @Get()
  @UsePipes(new ValidationPipe({
    whitelist: true,
  }))
  async auth(@Body() authUser: AuthDto, @Res() response: Response): Promise<any> {

    if (!(await this.authService.auth(authUser))) {
      throw new UnauthorizedException({
        message: 'Usuario o contraseña incorrectos.'
      });
    }

    return response.json({ ...authUser });
  }
}