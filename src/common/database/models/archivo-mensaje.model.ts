import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import TipoArchivo from './tipo-archivo.model';
import Mensaje from './mensaje.model';

@Table({
  underscored: true,
  tableName: 'mnt_archivo_mensaje',
})
export default class ArchivoMensaje extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  urlArchivo: string;

  @ForeignKey(() => TipoArchivo)
  idTipoArchivo: number;

  @BelongsTo(() => TipoArchivo)
  tipoArchivo: TipoArchivo;

  @ForeignKey(() => Mensaje)
  idMensaje: number;

  @BelongsTo(() => Mensaje)
  mensaje: Mensaje;
}
