import { Table, Model, Column, PrimaryKey, AutoIncrement, IsDate } from 'sequelize-typescript';

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: 'active' })
  status: string;

  @IsDate
  @Column
  createdAt: Date;

  @IsDate
  @Column
  updatedAt: Date;
}
