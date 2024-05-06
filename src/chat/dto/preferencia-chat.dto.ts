import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreatePreferenciaChatDto {
  @IsString()
  nombre: string;

  @IsString()
  fondoColor: string;
}

export class UpdatePreferenciaChatDto extends PartialType(CreatePreferenciaChatDto) { }
