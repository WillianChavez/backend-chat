import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
  @IsString({
    message: 'El nombre debe ser un texto'
  })
  @IsNotEmpty({
    message: 'El nombre es requerido'
  })
  nombre: string;

  @IsString({
    message: 'La contraseña debe ser un texto'
  })
  @IsNotEmpty({
    message: 'La contraseña es requerida'
  })
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
  contra: string;
}