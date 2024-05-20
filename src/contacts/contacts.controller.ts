import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { FriendRequestDto } from './dto/friend-request.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Get('list-friend-requests/:idUsuario')
  listFriendRequests(@Param('idUsuario') idUsuario: string) {
    return this.contactsService.listFriendRequests(Number(idUsuario));
  }

  @Post('accept-friend-request')
  acceptFriendRequest(@Body() friendRequest: FriendRequestDto) {
    {
      const { idUsuario, idContacto } = friendRequest;
      return this.contactsService.acceptFriendRequest(idUsuario, idContacto);
    }
  }

  @Post('send-friend-request')
  sendFriendRequest(@Body() friendRequest: FriendRequestDto) {
    const { idUsuario, idContacto } = friendRequest;
    return this.contactsService.sendFriendRequest(idUsuario, idContacto);
  }

  @Post('block-contact')
  blockContact(@Body() friendRequest: FriendRequestDto) {
    const { idUsuario, idContacto } = friendRequest;
    return this.contactsService.blockContact(idUsuario, idContacto);
  }

}
