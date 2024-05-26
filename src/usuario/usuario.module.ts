import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Usuario from 'src/common/database/models/usuario.model';
import Perfil from 'src/common/database/models/perfil.model';
import { AuthGuardMiddleware } from 'src/auth/middleware/auth-guard/auth-guard.middleware';
import { AuthTfaGuardMiddleware } from 'src/auth/middleware/tfa-guard/auth-tfa-guard.middleware';
import { PerfilService } from './services/perfil.service';
import PreferenciaUsuario from 'src/common/database/models/preferencia-usuario.model';

@Module({
  imports: [SequelizeModule.forFeature([Usuario, Perfil, PreferenciaUsuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService, PerfilService],
  exports: [UsuarioService, SequelizeModule],
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
