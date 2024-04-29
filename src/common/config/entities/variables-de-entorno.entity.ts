import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entornos } from '../env-config/enviroments';
import { Dialect } from 'sequelize';
import { IsValidDialect } from '../validators/dialect.validator';
export class VariablesDeEntorno {
  @IsNotEmpty()
  @IsEnum(Entornos)
  APP_ENV: Entornos;

  @IsNotEmpty()
  @IsString()
  HOST: string;

  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  SECRET_KEY: string;

  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_DATABASE: string;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  @IsValidDialect()
  DB_DIALECT: Dialect;

  @IsNotEmpty()
  @IsString()
  APP_DEBUG: string;
}
