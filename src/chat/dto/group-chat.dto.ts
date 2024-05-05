import { IsString, ArrayUnique, IsNumber } from "class-validator";

export class CreateGroupChatDto {
  @IsString()
  nombre: string;

  @ArrayUnique()
  @IsNumber({}, { each: true })
  idsUsuarios: number[];
}