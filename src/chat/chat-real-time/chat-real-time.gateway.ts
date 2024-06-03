import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import {} from '@nestjs/platform-socket.io';
import { ChatRealTimeService } from './chat-real-time.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { NewReactionMessageDto } from './dto/new-reaction-message.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { BadRequestException } from '@nestjs/common';

@WebSocketGateway()
export class ChatRealTimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatRealTimeService: ChatRealTimeService,

    private readonly authService: AuthService,

    private readonly usuarioService: UsuarioService
  ) {}

  afterInit() {
    console.log('Socket server initialized');
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    console.log('Client connected: ' + client.id);
    this.joinRoom(client);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ' + client.id);
  }

  // Método para manejar los nuevos mensajes recibidos del cliente y enviarlos a los demás clientes
  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() newMessageDto: NewMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    let temp = JSON.parse(JSON.stringify(newMessageDto)) as NewMessageDto;
    if (typeof temp === 'string') temp = JSON.parse(temp) as NewMessageDto;

    const usuario = await this.usuarioService.exist(temp.idUsuario);
    const { room, message } = await this.chatRealTimeService.saveMessage(temp);
    const newMessage = {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
      },
      message,
    };
    client.broadcast.to(room).emit('new-message', newMessage);
  }

  // Método para manejar las reacciones a los mensajes
  @SubscribeMessage('send-reaction')
  async sendReaction(
    @MessageBody() newReaction: NewReactionMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    const { reaccion, room } = await this.chatRealTimeService.saveReaction(newReaction);
    client.broadcast.to(room).emit('new-reaction', reaccion);
  }

  // Método para unirse a una sala de chat
  async joinRoom(@ConnectedSocket() client: Socket) {
    const token = client.handshake.headers.authorization || client.handshake.auth.token;
    if (token) {
      const user = await this.authService.decryptoToken(token);
      if (!user || !user.id) client.emit('error', 'Invalid token');
      const { rooms } = await this.chatRealTimeService.getRoomsForUser(user.id);
      client.join(rooms);
    }

    client.emit('joined-room', 'Joined room successfully');
  }
}
