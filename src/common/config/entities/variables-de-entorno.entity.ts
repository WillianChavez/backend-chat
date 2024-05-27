import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
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
  DB_NAME: string;

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
  @IsBoolean()
  DB_LOGGER: boolean;

  @IsNotEmpty()
  @IsString()
  APP_DEBUG: string;

  @IsString()
  @ValidateIf((object, value) => (value ?? '').trim().length > 0)
  MAIL_HOST!: string;

  @IsNumber()
  @ValidateIf((object, value) => (value ?? '').toString().trim().length > 0)
  MAIL_PORT!: number;

  @IsString()
  @ValidateIf((object, value) => (value ?? '').trim().length > 0)
  MAIL_USER!: string;

  @IsString()
  @ValidateIf((object, value) => (value ?? '').trim().length > 0)
  MAIL_PASS!: string;

  @IsString()
  @ValidateIf((object, value) => (value ?? '').trim().length > 0)
  MAIL_FROM!: string;
}
