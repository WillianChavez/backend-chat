import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { TipoChatService } from './services/tipo-chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateGroupChatDto } from './dto/group-chat.dto';
import { UpdatePreferenciaChatDto } from './dto/preferencia-chat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly tipoChatService: TipoChatService
  ) {}

  @Get('/')
  findAll() {
    return this.chatService.findAll();
  }

  @Get('/tipos')
  async listAllTipoChat() {
    const tipos = await this.tipoChatService.listAll();
    return tipos;
  }

  @Get('/reacciones')
  async listAllReacciones() {
    const tipos = await this.chatService.listReacciones();
    return tipos;
  }

  @Get('/usuario/:idUsuario')
  findOne(@Param('idUsuario') idUsuario: number) {
    return this.chatService.findAll(idUsuario);
  }

  @Get('/:idChat/mensajes')
  findMessages(@Param('idChat') idChat: number) {
    return this.chatService.getMessagesByChat(idChat);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createChatDto: CreateChatDto, @UploadedFile() file: Express.Multer.File) {
    return this.chatService.create(createChatDto, file);
  }

  @Post('/group')
  @UseInterceptors(FileInterceptor('file'))
  createGroup(
    @Body() createGroupChatDto: CreateGroupChatDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file);
    return this.chatService.createGroupChat(createGroupChatDto);
  }

  @Put('/preferencia/:idPreferenciaChat')
  updatePreferenciaChat(
    @Param('idPreferenciaChat') idPreferenciaChat: number,
    @Body() updatePreferenciaChatDto: UpdatePreferenciaChatDto
  ) {
    return this.chatService.updatePreferenciaChat(idPreferenciaChat, updatePreferenciaChatDto);
  }
}
