import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CommonModule, ChatModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
