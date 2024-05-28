import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Usuario from 'src/common/database/models/usuario.model';
import ContactoBloqueado from 'src/common/database/models/contacto-bloqueado.model';
import ContactoUsuario from 'src/common/database/models/contacto-usuario.model';
import Perfil from 'src/common/database/models/perfil.model';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(ContactoUsuario)
    private contactoUsuarioModel: typeof ContactoUsuario,
    @InjectModel(ContactoBloqueado)
    private contactoBloqueadoModel: typeof ContactoBloqueado,
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,

    private sequelize: Sequelize
  ) {}

  async listFriendRequests(idUsuario: number) {
    return await this.contactoUsuarioModel.findAll({
      attributes: ['id', 'aceptado'],
      where: {
        id_contacto: idUsuario,
        aceptado: false,
      },
      include: [
        {
          model: Usuario,
          attributes: ['id', 'nombre'],
          as: 'usuario',
          include: [
            {
              model: Perfil,
              attributes: ['nombre', 'foto'],
            },
          ],
        },
      ],
    });
  }

  async sendFriendRequest(idUsuario: number, idContacto: number) {
    const contactAccepted = await this.findContactAccepted(idUsuario, idContacto);
    if (contactAccepted)
      throw new BadRequestException(
        'No puedes enviar una solicitud a un contacto que ya has aceptado'
      );

    return await this.contactoUsuarioModel.create({
      id_usuario: idUsuario,
      id_contacto: idContacto,
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
          id_usuario: idContacto,
          id_contacto: idUsuario,
        },
      }
    );

    return await this.contactoUsuarioModel.create({
      id_usuario: idContacto,
      id_contacto: idUsuario,
      aceptado: true,
    });
  }

  private async findContactAccepted(idUsuario: number, idContacto: number) {
    return await this.contactoUsuarioModel.findOne({
      where: {
        id_usuario: idContacto,
        id_contacto: idUsuario,
        aceptado: true,
      },
    });
  }

  async blockContact(idUsuario: number, idContacto: number) {
    const isContactAccepted = await this.findContactAccepted(idUsuario, idContacto);

    if (!isContactAccepted)
      throw new BadRequestException('No puedes bloquear a un contacto que no has aceptado');

    return await this.contactoBloqueadoModel.create({
      id_usuario: idContacto,
      id_usuario_bloqueado: idContacto,
    });
  }

  async listAllContactsForUser(idUsuario: number) {
    const sqlContactoAceptado = `EXISTS(SELECT id FROM mnt_contacto_usuario as c WHERE c.id_usuario = ${idUsuario} AND c.id_contacto = "Usuario".id)`;
    const usuarios = await this.usuarioModel.findAll({
      attributes: {
        include: [
          'id',
          'nombre',
          [this.sequelize.literal(sqlContactoAceptado), 'contacto_aceptado'],
        ],
        exclude: ['contra', 'created_at', 'updated_at'],
      },
      where: {
        id: {
          [Op.not]: idUsuario,
        },
      },
      include: [
        {
          model: Perfil,
          attributes: ['nombre', 'foto'],
        },
      ],
    });

    return usuarios;
  }
}
