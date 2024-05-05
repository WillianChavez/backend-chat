import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) { }

  @Post()
  async create(@Body() usuario: CreateUsuarioDto) {
    return await this.usuarioService.create(usuario);
  }
}
