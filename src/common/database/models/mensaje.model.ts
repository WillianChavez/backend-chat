import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Chat from './chat.model';
import Usuario from './usuario.model';
import LecturaMensaje from './lectura-mensaje.model';
import ReaccionMensaje from './reaccion-mensaje.model';

@Table({
  tableName: 'mnt_mensaje',
})
export default class Mensaje extends Model {
  @AutoIncrement
  @PrimaryKey
  id: number;

  @Column
  mensaje: string;

  @CreatedAt
  fechaHora: Date;

  @ForeignKey(() => Chat)
  idChat: number;

  @BelongsTo(() => Chat)
  chat: Chat;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @HasMany(() => LecturaMensaje)
  lecturas: LecturaMensaje[];

  @HasMany(() => ReaccionMensaje)
  reacciones: ReaccionMensaje[];
}
