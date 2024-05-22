import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class FriendRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idContacto: number;
}