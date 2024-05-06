import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayDisconnect, OnGatewayConnection, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { } from '@nestjs/platform-socket.io'
import { ChatRealTimeService } from './chat-real-time.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import Mensaje from 'src/common/database/models/mensaje.model';
import { NewReactionMessageDto } from './dto/new-reaction-message.dto';
import ReaccionMensaje from 'src/common/database/models/reaccion-mensaje.model';

@WebSocketGateway()
export class ChatRealTimeGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer() server: Server;

  constructor(
    private readonly chatRealTimeService: ChatRealTimeService,
    @InjectModel(Mensaje)
    private mensajeModel: typeof Mensaje,

    @InjectModel(ReaccionMensaje)
    private reaccionMensajeModel: typeof ReaccionMensaje,
  ) { }

  afterInit() {
    console.log('Socket server initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ' + client.id);
  }


  // Método para manejar los nuevos mensajes recibidos del cliente y enviarlos a los demás clientes
  @SubscribeMessage('send-message')
  async sendMessage(@MessageBody() newMessage: NewMessageDto, @ConnectedSocket() client: Socket) {
    const message = await this.mensajeModel.create({
      idChat: newMessage.idChat,
      idUsuario: newMessage.idUsuario,
      mensaje: newMessage.mensaje,
    });

    client.broadcast.emit('new-message', message);
  }

  // Método para manejar las reacciones a los mensajes
  @SubscribeMessage('send-reaction')
  async sendReaction(@MessageBody() newReaction: NewReactionMessageDto, @ConnectedSocket() client: Socket) {


    const reaccion = await this.reaccionMensajeModel.create({
      idMensaje: newReaction.idMensaje,
      idUsuario: newReaction.idUsuario,
      idReaccion: newReaction.idReaccion,
    });

    client.broadcast.emit('new-reaction', reaccion);
  }

  // Método para unirse a una sala de chat
  @SubscribeMessage('join-room')
  joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.join(room);
    client.emit('joined-room', room);
  }


}
