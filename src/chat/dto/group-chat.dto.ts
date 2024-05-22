import { ApiProperty } from "@nestjs/swagger";
import { IsString, ArrayUnique, IsNumber } from "class-validator";

export class CreateGroupChatDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  idsUsuarios: number[];
}