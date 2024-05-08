import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayDisconnect, OnGatewayConnection, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { } from '@nestjs/platform-socket.io'
import { ChatRealTimeService } from './chat-real-time.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { NewReactionMessageDto } from './dto/new-reaction-message.dto';
import { AuthService } from 'src/auth/services/auth.service';

@WebSocketGateway()
export class ChatRealTimeGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer() server: Server;

  constructor(
    private readonly chatRealTimeService: ChatRealTimeService,

    private readonly authService: AuthService,
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
    const { room, message } = await this.chatRealTimeService.saveMessage(newMessage);

    client.broadcast.to(room).emit('new-message', message);
  }

  // Método para manejar las reacciones a los mensajes
  @SubscribeMessage('send-reaction')
  async sendReaction(@MessageBody() newReaction: NewReactionMessageDto, @ConnectedSocket() client: Socket) {
    const { reaccion, room } = await this.chatRealTimeService.saveReaction(newReaction);
    client.broadcast.to(room).emit('new-reaction', reaccion);
  }

  // Método para unirse a una sala de chat
  @SubscribeMessage('join-room')
  async joinRoom(@ConnectedSocket() client: Socket) {
    const token = client.handshake.headers.authorization || client.handshake.auth.token;
    if (token) {
      const user = await this.authService.decryptoToken(token);
      const { rooms } = await this.chatRealTimeService.getRoomsForUser(user.id);
      client.join(rooms);
    }

    client.emit('joined-room');
  }


}
