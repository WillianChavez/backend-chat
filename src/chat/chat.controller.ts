import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { TipoChatService } from './services/tipo-chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateGroupChatDto } from './dto/group-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly tipoChatService: TipoChatService
  ) { }


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


  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Post()
  createGroup(@Body() createGroupChatDto: CreateGroupChatDto) {
    return this.chatService.createGroupChat(createGroupChatDto);
  }
}
