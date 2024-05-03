import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller({
  path: 'auth',
})
export class AuthController {

  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @Get('/')
  async auth(@Req() request: Request, @Res() response: Response): Promise<any> {

    const { user, password } = request.body;

    if (!user || !password) {
      return response.status(400).json({
        message: 'El usuario y la contraseña son requeridos.'
      });
    }

    if (!this.authService.auth(user, password)) {
      return response.status(401).json({
        message: 'Usuario o contraseña incorrectos.'
      });
    }

    return response.json({ user, password });
  }
}