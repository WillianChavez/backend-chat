import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, ChatModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
