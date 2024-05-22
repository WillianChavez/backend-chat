import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthTfaGuardMiddleware } from 'src/auth/middleware/tfa-guard/auth-tfa-guard.middleware';
import { AuthGuardMiddleware } from 'src/auth/middleware/auth-guard/auth-guard.middleware';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) { }

  @Post()
  async create(@Body() usuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(usuarioDto);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.show(id);
  }

  @Get()
  async index() {
    return await this.usuarioService.index();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() usuarioDto: UpdateUsuarioDto) {
    return await this.usuarioService.update(id, usuarioDto);
  }

  @Patch(':id/update-password')
  async updatePassword(@Param('id', ParseIntPipe) id: number, @Body() usuarioDto: UpdatePasswordDto) {
    return await this.usuarioService.updatePassword(id, usuarioDto);
  }

  @UseGuards(AuthGuardMiddleware, AuthTfaGuardMiddleware)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.delete(id);
  }
}
