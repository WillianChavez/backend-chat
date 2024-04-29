import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';
import Mensaje from './mensaje.model';
import Usuario from './usuario.model';

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
