import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idTipoChat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idUsuarios: number[];
}
