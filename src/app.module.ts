import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [CommonModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
