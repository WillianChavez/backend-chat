import { Injectable } from '@nestjs/common';
import { NewMessageDto } from './dto/new-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import Mensaje from 'src/common/database/models/mensaje.model';
import ReaccionMensaje from 'src/common/database/models/reaccion-mensaje.model';
import UsuarioChat from 'src/common/database/models/usuario-chat.model';
import { NewReactionMessageDto } from './dto/new-reaction-message.dto';

@Injectable()
export class ChatRealTimeService {
  constructor(
    @InjectModel(Mensaje)
    private mensajeModel: typeof Mensaje,

    @InjectModel(ReaccionMensaje)
    private reaccionMensajeModel: typeof ReaccionMensaje,

    @InjectModel(UsuarioChat)
    private usuarioChatModel: typeof UsuarioChat
  ) {}

  async saveMessage(newMessage: NewMessageDto) {
    const message = await this.mensajeModel.create({
      idChat: newMessage.idChat,
      idUsuario: newMessage.idUsuario,
      mensaje: newMessage.mensaje,
    });
    const room = 'room-' + newMessage.idChat;

    return { room, message };
  }

  async saveReaction(newReaction: NewReactionMessageDto) {
    const reaccion = await this.reaccionMensajeModel.create({
      idMensaje: newReaction.idMensaje,
      idUsuario: newReaction.idUsuario,
      idReaccion: newReaction.idReaccion,
    });

    const mensaje = await this.mensajeModel.findByPk(newReaction.idMensaje);
    const room = 'room-' + mensaje.idChat;

    return { room, reaccion };
  }

  async getRoomsForUser(idUsuario: number) {
    const usuarioChats = await this.usuarioChatModel.findAll({
      where: {
        idUsuario: idUsuario,
      },
    });

    const rooms = usuarioChats.map((usuarioChat) => 'room-' + usuarioChat.idChat);
    return { rooms };
  }
}
