import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Chat from './chat.model';
import Usuario from './usuario.model';

@Table({
  tableName: 'mnt_preferencia_chat',
})
export default class PreferenciaChat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nombre: string;

  @Column
  fondoColor: string;

  @ForeignKey(() => Chat)
  idChat: number;

  @BelongsTo(() => Chat)
  chat: Chat;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}