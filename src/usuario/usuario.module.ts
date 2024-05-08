import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Usuario from 'src/common/database/models/usuario.model';
import Perfil from 'src/common/database/models/perfil.model';

@Module({
  imports: [SequelizeModule.forFeature([Usuario, Perfil])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule { }
