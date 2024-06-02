import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Perfil from 'src/common/database/models/perfil.model';
import { UpdatePerfilDto } from '../dto/update-perfil.dto';
import Usuario from 'src/common/database/models/usuario.model';

@Injectable()
export class PerfilService {
  constructor(
    @InjectModel(Perfil)
    private readonly perfilModel: typeof Perfil,

    @InjectModel(Usuario)
    private readonly usuarioModel: typeof Usuario
  ) {}

  async update(idUsuario: number, updatePerfilDto: UpdatePerfilDto, foto: Express.Multer.File) {
    const { biografia, correo, nombre, usuario } = updatePerfilDto;
    const perfil = await this.perfilModel.findOne({
      where: {
        id_usuario: idUsuario,
      },
    });

    if (!perfil) {
      return null;
    }
    await perfil.update({
      nombre,
      biografia,
      correo,
      foto: foto ? foto.filename : perfil.foto,
    });

    await this.usuarioModel.update(
      {
        nombre: usuario,
      },
      {
        where: {
          id: idUsuario,
        },
      }
    );

    return perfil;
  }

  async getPerfil(idUsuario: number) {
    const perfil = await this.perfilModel.findOne({
      where: {
        idUsuario: idUsuario,
      },
    });
    if (!perfil) throw new BadRequestException('Perfil no encontrado');

    return perfil;
  }
}
