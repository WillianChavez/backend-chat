import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { ContactsController } from './contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import ContactoUsuario from 'src/common/database/models/contacto-usuario.model';
import ContactoBloqueado from 'src/common/database/models/contacto-bloqueado.model';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { AuthGuardMiddleware } from 'src/auth/middleware/auth-guard/auth-guard.middleware';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [SequelizeModule.forFeature([ContactoUsuario, ContactoBloqueado]), UsuarioModule],
  controllers: [ContactsController],
  providers: [ContactsService, UsuarioService],
})
export class ContactsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthGuardMiddleware)
      .forRoutes(ContactsController);
  }
}
