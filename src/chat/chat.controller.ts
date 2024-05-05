import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { TipoChatService } from './services/tipo-chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly tipoChatService: TipoChatService
  ) { }

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get('/')
  findAll() {
    return this.chatService.findAll();
  }

  @Get('/tipos')
  async listAllTipoChat() {
    const tipos = await this.tipoChatService.listAll()
    return tipos;

  }

  @Get('/usuario/:idUsuario')
  findOne(@Param('id') idUsuario: number) {
    return this.chatService.findAll(idUsuario);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }


}
