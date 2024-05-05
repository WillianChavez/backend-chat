import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  idTipoChat: number;

  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;
}
