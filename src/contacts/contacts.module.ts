import { Module } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { ContactsController } from './contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import ContactoUsuario from 'src/common/database/models/contacto-usuario.model';
import ContactoBloqueado from 'src/common/database/models/contacto-bloqueado.model';
import Usuario from 'src/common/database/models/usuario.model';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [SequelizeModule.forFeature([ContactoUsuario, ContactoBloqueado, Usuario])],
})
export class ContactsModule { }
