import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

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
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
    minLowercase: 0
  }, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
  contra: string;

  @IsString({
    message: 'El correo debe ser un texto'
  })
  @IsEmail({}, {
    message: 'El correo no es válido'
  })
  @IsNotEmpty({
    message: 'El correo es requerido'
  })
  correo: string;

  @IsString({
    message: 'El nombre de usuario debe ser un texto'
  })
  @IsNotEmpty({
    message: 'El nombre de usuario es requerido'
  })
  nombre_usuario: string;
}