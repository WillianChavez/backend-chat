import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idTipoChat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;
}
