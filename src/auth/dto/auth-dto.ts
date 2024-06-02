import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
  @ApiProperty()
  @IsString({
    message: 'El nombre de usuario debe ser una cadena de texto.',
  })
  @IsNotEmpty({
    message: 'El nombre de usuario es requerido.',
  })
  username: string;

  @ApiProperty()
  @IsString({
    message: 'La contraseña debe ser una cadena de texto.',
  })
  @IsNotEmpty({
    message: 'La contraseña es requerida.',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'El nombre del dispositivo es requerido.',
  })
  @IsString({
    message: 'El nombre del dispositivo debe ser una cadena de texto.',
  })
  nombreDispositivo: string;
}
