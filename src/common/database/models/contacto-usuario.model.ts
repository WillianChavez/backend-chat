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
  tableName: 'mnt_contacto_usuario',
})
export default class ContactoUsuario extends Model {
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
