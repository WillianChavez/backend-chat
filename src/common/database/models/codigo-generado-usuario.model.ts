import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import DobleFactorUsuario from './doble-factor-usuario.model';

@Table({
  underscored: true,  tableName: 'mnt_codigo_generado_usuario',
})
export default class CodigoGeneradoUsuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  codigo: string;

  @CreatedAt
  fechaCreacion: Date;
  @Column
  fechaExpiracion: Date;

  @ForeignKey(() => DobleFactorUsuario)
  idDobleFactorUsuario: number;

  @BelongsTo(() => DobleFactorUsuario)
  dobleFactorUsuario: DobleFactorUsuario;
}
