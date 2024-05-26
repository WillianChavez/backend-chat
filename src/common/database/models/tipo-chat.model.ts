import { AutoIncrement, Column, PrimaryKey, Table, Model, HasMany } from 'sequelize-typescript';
import Chat from './chat.model';

@Table({
  underscored: true,  tableName: 'ctl_tipo_chat',
})
export default class TipoChat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nombre: string;

  @HasMany(() => Chat)
  chats: Chat[];
}
