import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePerfilDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  biografia: string;
}