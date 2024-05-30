import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUsuarioPreferenciasDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  temaOscuro: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  idFuente: number;
}