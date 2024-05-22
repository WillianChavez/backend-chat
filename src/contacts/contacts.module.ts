import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { ContactsController } from './contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import ContactoUsuario from 'src/common/database/models/contacto-usuario.model';
import ContactoBloqueado from 'src/common/database/models/contacto-bloqueado.model';
import Usuario from 'src/common/database/models/usuario.model';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import Perfil from 'src/common/database/models/perfil.model';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, UsuarioService],
  imports: [SequelizeModule.forFeature([ContactoUsuario, ContactoBloqueado, Usuario, Perfil])],
})
export class ContactsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(ContactsController);
  }
}
