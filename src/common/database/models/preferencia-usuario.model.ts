import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Usuario from './usuario.model';
import FuenteTipografica from './fuente-tipografica.model';

@Table({
  tableName: 'mnt_preferencias_usuario',
})
export default class PreferenciaUsuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @ForeignKey(() => FuenteTipografica)
  idFuente: number;

  @BelongsTo(() => FuenteTipografica)
  fuente: FuenteTipografica;

  @Column
  temaOscuro: boolean;
}
