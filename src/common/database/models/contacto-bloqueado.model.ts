import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import Usuario from './usuario.model';

@Table({
  tableName: 'mnt_contacto_bloqueado',
})
export default class ContactoBloqueado extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Usuario)
  idContacto: number;

  @BelongsTo(() => Usuario, 'idContacto')
  contacto: Usuario;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario, 'idUsuario')
  usuario: Usuario;
}
