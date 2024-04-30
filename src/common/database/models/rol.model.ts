import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import RolOpcionMenu from './rol-opcion-menu.model';
import UsuarioChat from './usuario-chat.model';

@Table({
  tableName: 'ctl_rol',
})
export default class Rol extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nombre: string;

  @Column
  descripcion: string;

  @HasMany(() => RolOpcionMenu)
  rolOpcionMenus: RolOpcionMenu[];

  @HasMany(() => UsuarioChat)
  usuariosChat: UsuarioChat[];
}
