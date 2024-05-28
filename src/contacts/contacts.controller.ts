import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { FriendRequestDto } from './dto/friend-request.dto';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly usuarioServices: UsuarioService
  ) {}

  @Get('list-friend-requests/:idUsuario')
  async listFriendRequests(@Param('idUsuario') idUsuario: number) {
    await this.usuarioServices.exist(idUsuario);
    return this.contactsService.listFriendRequests(idUsuario);
  }

  @Get('find-contacts/:idUsuario')
  async findContacts(@Param('idUsuario') idUsuario: number) {
    await this.usuarioServices.exist(idUsuario);
    return this.contactsService.listAllContactsForUser(idUsuario);
  }

  @Post('accept-friend-request')
  async acceptFriendRequest(@Body() friendRequest: FriendRequestDto) {
    const { idUsuario, idContacto } = friendRequest;
    await this.usuarioServices.exist(idContacto);
    await this.usuarioServices.exist(idUsuario);

    return this.contactsService.acceptFriendRequest(idUsuario, idContacto);
  }

  @Post('send-friend-request')
  async sendFriendRequest(@Body() friendRequest: FriendRequestDto) {
    const { idUsuario, idContacto } = friendRequest;
    await this.usuarioServices.exist(idContacto);
    await this.usuarioServices.exist(idUsuario);

    return await this.contactsService.sendFriendRequest(idUsuario, idContacto);
  }

  @Post('block-contact')
  async blockContact(@Body() friendRequest: FriendRequestDto) {
    const { idUsuario, idContacto } = friendRequest;
    await this.usuarioServices.exist(idContacto);
    await this.usuarioServices.exist(idUsuario);

    return this.contactsService.blockContact(idUsuario, idContacto);
  }
}
