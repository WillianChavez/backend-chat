import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";


export class TfaVertifyDto {
  @ApiProperty()
  @IsString({
    message: 'El código debe ser una cadena de texto.'
  })
  @IsNotEmpty({
    message: 'El código es requerido.'
  })
  @Length(6, 6, {
    message: 'El código debe ser de 6 dígitos.'
  })
  codigo: string;
}