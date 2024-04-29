import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  IsEmail,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';
import Usuario from './usuario.model';

export default class Perfil extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  nombre: string;

  @Column
  biografia: string;

  @Column
  foto: string;

  @Column
  @IsEmail
  correo: string;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
