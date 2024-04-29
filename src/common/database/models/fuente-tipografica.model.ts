import { AutoIncrement, Column, PrimaryKey, Table, Model } from 'sequelize-typescript';

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
}
