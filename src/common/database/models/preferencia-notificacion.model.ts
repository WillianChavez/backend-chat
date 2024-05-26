import {
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Usuario from './usuario.model';

@Table({
  underscored: true,
  tableName: 'mnt_preferencia_notificacion',
})
export default class PreferenciaNotificacion extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  @Default(false)
  silenciadas: boolean;

  @Column
  @Default(false)
  activoHorarioNotificacion: boolean;

  @Column
  horaInicio: Date;

  @Column
  horaFin: Date;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
