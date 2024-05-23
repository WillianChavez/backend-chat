import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Mensaje from './mensaje.model';
import Usuario from './usuario.model';

@Table({
  tableName: 'mnt_lectura_mensaje',
  underscored: true,
})
export default class LecturaMensaje extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  leido: boolean;

  @CreatedAt
  fechaHora: Date;

  @ForeignKey(() => Mensaje)
  idMensaje: number;

  @BelongsTo(() => Mensaje)
  mensaje: Mensaje;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
