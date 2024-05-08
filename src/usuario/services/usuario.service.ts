import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import Usuario from 'src/common/database/models/usuario.model';
import Perfil from 'src/common/database/models/perfil.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
    @InjectModel(Perfil)
    private perfilModel: typeof Perfil
  ) { }


  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuarioModel.findOne(({
      where: {
        nombre: createUsuarioDto.nombre_usuario
      }
    }));

    if (usuarioExistente) throw new ConflictException('Usuario ya existe');

    const perfilExistente = await this.perfilModel.findOne({
      where: {
        correo: createUsuarioDto.correo
      }
    });

    if (perfilExistente) throw new ConflictException('Correo ya registrado');

    const usuario = (await this.usuarioModel.create({
      nombre: createUsuarioDto.nombre_usuario,
      contra: await bcrypt.hash(createUsuarioDto.contra, 10),
      perfil: {
        nombre: createUsuarioDto.nombre,
        correo: createUsuarioDto.correo,
      }
    }, {
      include: [Perfil],
      attributes: {
        exclude: ['contra']
      }
    })).hidePassword();



    return usuario;

  }

}
