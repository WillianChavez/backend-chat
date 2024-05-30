import { AutoIncrement, Column, PrimaryKey, Table, Model, HasMany } from 'sequelize-typescript';
import ArchivoMensaje from './archivo-mensaje.model';

@Table({
  underscored: true,  tableName: 'ctl_tipo_archivo',
})
export default class TipoArchivo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nombre: string;

  @HasMany(() => ArchivoMensaje)
  archivosMensaje: ArchivoMensaje[];
}
