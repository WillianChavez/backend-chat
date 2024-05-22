import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UpdatePasswordDto {
  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
    minLowercase: 0
  }, {
    message: 'La nueva contraseña debe tener al menos 6 caracteres'
  })
  @IsNotEmpty({
    message: 'La nueva contraseña es requerida'
  })
  contra_nueva: string;

  @ApiProperty()
  @IsString({
    message: 'La contraseña actual debe ser un texto'
  })
  @IsNotEmpty({
    message: 'La contraseña actual es requerida'
  })
  contra_actual: string;

  @ApiProperty()
  @IsString({
    message: 'La confirmación de la contraseña debe ser un texto'
  })
  @IsNotEmpty({
    message: 'La confirmación de la contraseña es requerida'
  })
  contra_confirmacion: string;
}