import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import Usuario from 'src/common/database/models/usuario.model';
import Perfil from 'src/common/database/models/perfil.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Op } from 'sequelize';
import { UpdatePasswordDto } from '../dto/update-password.dto';

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

  async show(id: number) {
    return await this.usuarioModel.findByPk(id, {
      include: [Perfil],
      attributes: {
        exclude: ['contra']
      }
    });
  }

  async index() {
    return await this.usuarioModel.findAll({
      include: [Perfil],
      attributes: {
        exclude: ['contra']
      }
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioModel.findByPk(id);

    if (!usuario) throw new ConflictException('Usuario no existe');

    if (updateUsuarioDto.nombre_usuario) {
      const usuarioExistente = await this.usuarioModel.findOne({
        where: {
          nombre: updateUsuarioDto.nombre_usuario,
          id: {
            [Op.not]: usuario.id
          }
        }
      });

      if (usuarioExistente) throw new ConflictException('Usuario ya existe');

      usuario.nombre = updateUsuarioDto.nombre_usuario;

    };

    await usuario.save();

    return usuario;
  }

  async updatePassword(id: number, updatePassword: UpdatePasswordDto) {
    const usuario = await this.usuarioModel.findByPk(id);

    if (!usuario) throw new ConflictException('Usuario no existe');

    if (!(await bcrypt.compare(updatePassword.contra_actual, usuario.contra))) {
      throw new ConflictException('Contraseña actual incorrecta');
    }

    if (updatePassword.contra_actual === updatePassword.contra_nueva) {
      throw new ConflictException('La nueva contraseña no puede ser igual a la actual');
    }

    if (updatePassword.contra_nueva !== updatePassword.contra_confirmacion) {
      throw new ConflictException('Las contraseñas no coinciden');
    }

    usuario.contra = await bcrypt.hash(updatePassword.contra_nueva, 10);

    await usuario.save();

    return usuario.hidePassword();
  }

  async delete(id: number) {
    const usuario = await this.usuarioModel.findByPk(id);

    if (!usuario) throw new ConflictException('Usuario no existe');

    await usuario.destroy();

    return usuario;
  }
}
