import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import OpcionMenu from './ctl-opcion-menu.model';
import Rol from './rol.model';

@Table({
  tableName: 'mnt_rol_opcion_menu',
})
export default class RolOpcionMenu extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => OpcionMenu)
  idOpcionMenu: number;

  @BelongsTo(() => OpcionMenu)
  opcionMenu: OpcionMenu;

  @ForeignKey(() => Rol)
  idRol: number;

  @BelongsTo(() => Rol)
  rol: Rol;
}
