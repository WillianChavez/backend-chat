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
import Rol from './rol.model';

@Table({
  underscored: true,  tableName: 'mnt_usuario_chat',
})
export default class UsuarioChat extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Chat)
  idChat: Chat;

  @BelongsTo(() => Chat)
  chat: Chat;

  @ForeignKey(() => Usuario)
  IdUsuario: Usuario;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @ForeignKey(() => Rol)
  idRol: number;

  @BelongsTo(() => Rol)
  rol: Rol;
}
