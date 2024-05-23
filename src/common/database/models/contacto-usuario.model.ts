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
  underscored: true,
})
export default class ContactoUsuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  aceptado: boolean;

  @ForeignKey(() => Usuario)
  idContacto: number;

  @BelongsTo(() => Usuario, 'idContacto')
  contacto: Usuario;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario, 'idUsuario')
  usuario: Usuario;
}
