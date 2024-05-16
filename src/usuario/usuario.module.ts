import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Usuario from 'src/common/database/models/usuario.model';
import Perfil from 'src/common/database/models/perfil.model';
import { AuthGuardMiddleware } from 'src/auth/middleware/auth-guard/auth-guard.middleware';
import { AuthTfaGuardMiddleware } from 'src/auth/middleware/tfa-guard/auth-tfa-guard.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Usuario, Perfil])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthGuardMiddleware, AuthTfaGuardMiddleware)
      .exclude(
        { path: ':id', method: RequestMethod.POST },
      )
      .forRoutes(UsuarioController)
  }
}
