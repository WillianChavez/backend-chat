import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// import { AuthController } from './auth.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Usuario from 'src/common/database/models/usuario.model';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';
import { JwtService } from '@nestjs/jwt';
import { TfaService } from './services/tfa.service';
import DobleFactorUsuario from 'src/common/database/models/doble-factor-usuario.model';
import { MailService } from 'src/common/mail/mail.service';
import CodigoGeneradoUsuario from 'src/common/database/models/codigo-generado-usuario.model';
import { AuthGuardMiddleware } from './middleware/auth-guard/auth-guard.middleware';

@Module({
  imports: [SequelizeModule.forFeature([
    Usuario,
    DispositivoVinculado,
    DobleFactorUsuario,
    CodigoGeneradoUsuario
  ])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, TfaService, MailService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthGuardMiddleware)
      .forRoutes({ path: 'auth/verify-tfa', method: RequestMethod.POST });
  }
}
