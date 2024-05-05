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
import TipoChat from './tipo-chat.model';
import PreferenciaChat from './preferencia-chat.model';
import UsuarioChat from './usuario-chat.model';
import Usuario from './usuario.model';
import Mensaje from './mensaje.model';

@Table({
  tableName: 'mnt_chat',
})
export default class Chat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @CreatedAt
  fechaCreacion: Date;

  @Column
  uriFoto: string;

  @ForeignKey(() => TipoChat)
  idTipoChat: number;

  @BelongsTo(() => TipoChat)
  tipoChat: TipoChat;

  @HasMany(() => PreferenciaChat)
  preferencias: PreferenciaChat[];

  @HasMany(() => UsuarioChat)
  usuarios: Usuario[];

  @HasMany(() => Mensaje)
  mensajes: Mensaje[];
}
