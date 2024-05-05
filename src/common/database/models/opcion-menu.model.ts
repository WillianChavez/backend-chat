import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import RolOpcionMenu from './rol-opcion-menu.model';

@Table({
  tableName: 'ctl_opcion_menu',
})
export default class OpcionMenu extends Model {
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
}
