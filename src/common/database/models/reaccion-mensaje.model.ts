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
import Reaccion from './reaccion.model';
import Usuario from './usuario.model';

@Table({
  underscored: true,  tableName: 'mnt_reaccion_mensaje',
})
export default class ReaccionMensaje extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Mensaje)
  idMensaje: number;

  @BelongsTo(() => Mensaje)
  mensaje: Mensaje;

  @ForeignKey(() => Reaccion)
  idReaccion: number;

  @BelongsTo(() => Reaccion)
  reaccion: Reaccion;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @CreatedAt
  fechaReaccion: Date;
}
