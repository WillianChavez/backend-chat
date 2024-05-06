import { Module } from '@nestjs/common';
import { ChatRealTimeService } from './chat-real-time.service';
import { ChatRealTimeGateway } from './chat-real-time.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import Mensaje from 'src/common/database/models/mensaje.model';
import ReaccionMensaje from 'src/common/database/models/reaccion-mensaje.model';

@Module({
  imports: [SequelizeModule.forFeature([Mensaje, ReaccionMensaje])],
  providers: [ChatRealTimeGateway, ChatRealTimeService]
})
export class ChatRealTimeModule { }
