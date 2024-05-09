import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Usuario from 'src/common/database/models/usuario.model';
import ContactoBloqueado from 'src/common/database/models/contacto-bloqueado.model';
import ContactoUsuario from 'src/common/database/models/contacto-usuario.model';
import Perfil from 'src/common/database/models/perfil.model';

@Injectable()
export class ContactsService {

  constructor(
    @InjectModel(ContactoUsuario)
    private contactoUsuarioModel: typeof ContactoUsuario,
    @InjectModel(ContactoBloqueado)
    private contactoBloqueadoModel: typeof ContactoBloqueado,
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
  ) { }

  async listFriendRequests(idUsuario: number) {
    return await this.contactoUsuarioModel.findAll({
      where: {
        idContacto: idUsuario,
        aceptado: false,
      },
      include: [
        {
          model: Usuario,
          attributes: ['id', 'nombreUsuario'],
          as: 'usuario',
          include: [{
            model: Perfil,
            attributes: ['nombre', 'foto'],
          }]
        },
      ],
    });
  }

  async sendFriendRequest(idUsuario: number, idContacto: number) {
    const contactAccepted = await this.findContactAccepted(idUsuario, idContacto);
    if (contactAccepted) throw new BadRequestException('No puedes enviar una solicitud a un contacto que ya has aceptado');

    return await this.contactoUsuarioModel.create({
      idUsuario,
      idContacto,
      aceptado: false,
    });
  }

  async acceptFriendRequest(idUsuario: number, idContacto: number) {
    const contactAccepted = await this.findContactAccepted(idContacto, idUsuario);
    if (contactAccepted) return contactAccepted;

    await this.contactoUsuarioModel.update(
      { aceptado: true },
      {
        where: {
          idUsuario: idContacto,
          idContacto: idUsuario,
        },
      },
    );

    return await this.contactoUsuarioModel.create({
      idUsuario,
      idContacto,
      aceptado: true,
    });
  }

  private async findContactAccepted(idUsuario: number, idContacto: number) {
    return await this.contactoUsuarioModel.findOne({
      where: {
        idUsuario,
        idContacto,
        aceptado: true,
      },
    });
  }

  async blockContact(idUsuario: number, idContacto: number) {
    const isContactAccepted = await this.findContactAccepted(idUsuario, idContacto);

    if (!isContactAccepted) throw new BadRequestException('No puedes bloquear a un contacto que no has aceptado');


    return await this.contactoBloqueadoModel.create({
      idUsuario,
      idUsuarioBloqueado: idContacto,
    });
  }
}
