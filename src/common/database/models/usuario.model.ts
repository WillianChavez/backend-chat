import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import PreferenciaChat from './preferencia-chat.model';
import UsuarioChat from './usuario-chat.model';
import LecturaMensaje from './lectura-mensaje.model';
import ReaccionMensaje from './reaccion-mensaje.model';
import ContactoUsuario from './contacto-usuario.model';
import ContactoBloqueado from './contacto-bloqueado.model';
import Perfil from './perfil.model';
import DobleFactorUsuario from './doble-factor-usuario.model';
import DispositivoVinculado from './dispositivo-vinculado.model';
import PreferenciaUsuario from './preferencia-usuario.model';
import PreferenciaNotificacion from './preferencia-notificacion.model';

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

  @HasMany(() => DobleFactorUsuario)
  dobleFactor: DobleFactorUsuario[];

  @HasOne(() => Perfil)
  perfil: Perfil;

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

  @HasMany(() => DispositivoVinculado)
  dispositivosVinculados: DispositivoVinculado[];

  @HasMany(() => PreferenciaUsuario)
  preferenciasUsuario: PreferenciaUsuario[];

  @HasMany(() => PreferenciaNotificacion)
  preferenciasNotificacion: PreferenciaNotificacion[];

  // hidePassword
  hidePassword() {
    const { contra, ...rest } = this.get();
    return rest;
  }
}
