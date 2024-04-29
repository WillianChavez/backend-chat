import { Table, Model, Column, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import PreferenciaChat from './preferencia-chat.model';
import UsuarioChat from './usuario-chat.model';
import LecturaMensaje from './lectura-mensaje.model';
import ReaccionMensaje from './reaccion-mensaje.model';
import ContactoUsuario from './contacto-usuario.model';
import ContactoBloqueado from './contacto-bloqueado.model';

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

  @HasMany(() => ContactoUsuario, 'idUsuario')
  contactos: ContactoUsuario[];

  @HasMany(() => ContactoUsuario, 'idContacto')
  contactosDe: ContactoUsuario[];

  @HasMany(() => ContactoBloqueado, 'idUsuario')
  contactosBloqueados: ContactoBloqueado[];

  @HasMany(() => ContactoBloqueado, 'idContacto')
  contactosBloqueadosDe: ContactoBloqueado[];
}
