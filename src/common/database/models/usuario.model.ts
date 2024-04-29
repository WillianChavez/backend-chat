import { Table, Model, Column, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import PreferenciaChat from './preferencia-chat.model';
import UsuarioChat from './usuario-chat.model';
import LecturaMensaje from './lectura-mensaje.model';
import ReaccionMensaje from './reaccion-mensaje.model';

@Table({
  tableName: 'mnt_usuario',
})
export default class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nombre: string;

  @Column
  contra: string;

  @HasMany(() => PreferenciaChat)
  preferencias: PreferenciaChat[];

  @HasMany(() => UsuarioChat)
  usuariosChat: UsuarioChat[];

  @HasMany(() => LecturaMensaje)
  lecturas: LecturaMensaje[];

  @HasMany(() => ReaccionMensaje)
  reacciones: ReaccionMensaje[];
}
