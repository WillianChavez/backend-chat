import { IsString } from "class-validator";

export class UpdateUsuarioDto {
  @IsString({
    message: 'El nombre de usuario debe ser un texto'
  })
  nombre_usuario: string;
}