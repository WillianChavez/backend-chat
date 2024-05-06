import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'src/auth/dto/request-auth';

@Injectable()
export class AuthTfaGuardMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    const jwtData = req.jwtData;

    if (jwtData.tfaRequerido && !jwtData.tfaPasado) {
      throw new UnauthorizedException({
        message: 'Se requiere segundo factor de autenticación.'
      });
    }

    next();
  }
}
