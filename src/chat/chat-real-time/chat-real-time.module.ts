import { Module } from '@nestjs/common';
import { ChatRealTimeService } from './chat-real-time.service';
import { ChatRealTimeGateway } from './chat-real-time.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import Mensaje from 'src/common/database/models/mensaje.model';
import ReaccionMensaje from 'src/common/database/models/reaccion-mensaje.model';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/services/auth.service';
import Usuario from 'src/common/database/models/usuario.model';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';
import UsuarioChat from 'src/common/database/models/usuario-chat.model';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioService } from 'src/usuario/services/usuario.service';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Mensaje, ReaccionMensaje, DispositivoVinculado, UsuarioChat]),
    UsuarioModule,
  ],
  providers: [ChatRealTimeGateway, ChatRealTimeService, AuthService, UsuarioService],
})
export class ChatRealTimeModule {}
