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

@Table({
  underscored: true,  tableName: 'mnt_preferencia_notificacion',
})
export default class PreferenciaNotificacion extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  silenciadas: boolean;

  @Column
  activoHorarioNotificacion: boolean;

  @Column
  horaInicio: Date;

  @Column
  horaFin: Date;

  @Column
  fondoColor: string;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
