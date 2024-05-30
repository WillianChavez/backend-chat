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
  underscored: true, tableName: 'mnt_contacto_usuario',
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

  @BelongsTo(() => Usuario, 'id_contacto')
  contacto: Usuario;

  @ForeignKey(() => Usuario)
  idUsuario: number;

  @BelongsTo(() => Usuario, 'id_usuario')
  usuario: Usuario;
}
