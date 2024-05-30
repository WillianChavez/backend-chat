import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TipoChatService } from './services/tipo-chat.service';
import { ChatRealTimeModule } from './chat-real-time/chat-real-time.module';
import Chat from 'src/common/database/models/chat.model';
import TipoChat from 'src/common/database/models/tipo-chat.model';
import Usuario from 'src/common/database/models/usuario.model';
import PreferenciaChat from 'src/common/database/models/preferencia-chat.model';
import UsuarioChat from 'src/common/database/models/usuario-chat.model';
import Mensaje from 'src/common/database/models/mensaje.model';
import LecturaMensaje from 'src/common/database/models/lectura-mensaje.model';
import Reaccion from 'src/common/database/models/reaccion.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Chat,
      TipoChat,
      UsuarioChat,
      PreferenciaChat,
      Usuario,
      TipoChat,
      Mensaje,
      LecturaMensaje,
      Reaccion,
    ]),
    ChatRealTimeModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, TipoChatService],
  exports: [SequelizeModule, ChatService, TipoChatService],
})
export class ChatModule {}
