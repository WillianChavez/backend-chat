import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUsuarioDto {
  @ApiProperty()
  @IsString({
    message: 'El nombre de usuario debe ser un texto'
  })
  nombre_usuario: string;
}