import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectModel } from '@nestjs/sequelize';
import Usuario from 'src/common/database/models/usuario.model';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
  ) { }


  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuarioModel.findOne(({
      where: {
        nombre: createUsuarioDto.nombre
      }
    }));

    if (usuarioExistente) throw new ConflictException('Usuario ya existe');

    return await this.usuarioModel.create({
      nombre: createUsuarioDto.nombre,
      contra: await bcrypt.hash(createUsuarioDto.contra, 10),
    });


  }

}
