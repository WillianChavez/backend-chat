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
import Usuario from './usuario.model';

@Table({
  tableName: 'mnt_dispositivo_vinculado',
})
export default class DispositivoVinculado extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @Column
  nombreDispositivo: string;

  @CreatedAt
  fecha: Date;
}
