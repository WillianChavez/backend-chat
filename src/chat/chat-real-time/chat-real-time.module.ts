import { Module } from '@nestjs/common';
import { ChatRealTimeService } from './chat-real-time.service';
import { ChatRealTimeGateway } from './chat-real-time.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import Mensaje from 'src/common/database/models/mensaje.model';
import ReaccionMensaje from 'src/common/database/models/reaccion-mensaje.model';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/services/auth.service';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';
import UsuarioChat from 'src/common/database/models/usuario-chat.model';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { ContactsService } from 'src/contacts/services/contacts.service';
import ContactoBloqueado from 'src/common/database/models/contacto-bloqueado.model';
import Usuario from 'src/common/database/models/usuario.model';
import { Sequelize } from 'sequelize';
import { ChatService } from '../services/chat.service';
import ContactoUsuario from 'src/common/database/models/contacto-usuario.model';
import Chat from 'src/common/database/models/chat.model';
import PreferenciaChat from 'src/common/database/models/preferencia-chat.model';
import TipoChat from 'src/common/database/models/tipo-chat.model';
import Reaccion from 'src/common/database/models/reaccion.model';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([
      Mensaje,
      ReaccionMensaje,
      DispositivoVinculado,
      UsuarioChat,
      ContactoBloqueado,
      Usuario,
      ContactoUsuario,
      Chat,
      PreferenciaChat,
      TipoChat,
      Reaccion,
    ]),
    UsuarioModule,
  ],
  providers: [
    ChatRealTimeGateway,
    ChatRealTimeService,
    AuthService,
    UsuarioService,
    ContactsService,
    ChatService,
  ],
})
export class ChatRealTimeModule {}
