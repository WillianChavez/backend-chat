import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [CommonModule, ChatModule, AuthModule, ContactsModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
