import { AutoIncrement, Column, PrimaryKey, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'ctl_tipo_archivo',
})
export default class TipoArchivo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nombre: string;
}
