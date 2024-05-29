import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { ContactsController } from './contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import ContactoUsuario from 'src/common/database/models/contacto-usuario.model';
import ContactoBloqueado from 'src/common/database/models/contacto-bloqueado.model';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { AuthGuardMiddleware } from 'src/auth/middleware/auth-guard/auth-guard.middleware';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ChatModule } from 'src/chat/chat.module';
import { ChatService } from 'src/chat/services/chat.service';

@Module({
  imports: [
    SequelizeModule.forFeature([ContactoUsuario, ContactoBloqueado]),
    UsuarioModule,
    ChatModule,
  ],
  controllers: [ContactsController],
  providers: [ContactsService, UsuarioService, ChatService],
})
export class ContactsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthGuardMiddleware).forRoutes(ContactsController);
  }
}
