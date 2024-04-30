import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Usuario from './usuario.model';

@Table({
  tableName: 'mnt_perfil',
})
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
  correo: string;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
