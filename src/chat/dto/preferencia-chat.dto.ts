import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePreferenciaChatDto {

  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  fondoColor: string;
}

export class UpdatePreferenciaChatDto extends PartialType(CreatePreferenciaChatDto) { }
