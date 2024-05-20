import { IsNotEmpty, IsNumber } from "class-validator";

export class FriendRequestDto {
  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;

  @IsNotEmpty()
  @IsNumber()
  idContacto: number;
}