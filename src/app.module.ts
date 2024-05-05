import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [CommonModule, ChatModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
