import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Usuario from './usuario.model';
import CodigoGeneradoUsuario from './codigo-generado-usuario.model';

@Table({
  tableName: 'mnt_doble_factor_usuario',
})
export default class DobleFactorUsuario extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @Column
  secret: string;

  @HasMany(() => CodigoGeneradoUsuario)
  codigosGenerados: CodigoGeneradoUsuario[];
}
