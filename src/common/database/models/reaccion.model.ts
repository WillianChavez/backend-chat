import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import ReaccionMensaje from './reaccion-mensaje.model';

@Table({
  tableName: 'ctl_reaccion',
})
export default class Reaccion extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  valor: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => ReaccionMensaje)
  reaccionMensajes: ReaccionMensaje[];
}
