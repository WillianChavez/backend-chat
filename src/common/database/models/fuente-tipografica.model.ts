import { AutoIncrement, Column, PrimaryKey, Table, Model, HasMany } from 'sequelize-typescript';
import PreferenciaUsuario from './preferencia-usuario.model';

@Table({
  tableName: 'ctl_fuente_tipografica',
})
export default class FuenteTipografica extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nombre: string;

  @HasMany(() => PreferenciaUsuario)
  preferenciaUsuarios: PreferenciaUsuario[];
}
