import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthTfaGuardMiddleware } from 'src/auth/middleware/tfa-guard/auth-tfa-guard.middleware';
import { AuthGuardMiddleware } from 'src/auth/middleware/auth-guard/auth-guard.middleware';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUsuarioPreferenciasDto } from './dto/update-usuario-preferencias.dto';
import { PerfilService } from './services/perfil.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@ApiBearerAuth()
@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService, private perfilService: PerfilService) {}

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
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuarioDto: UpdatePasswordDto
  ) {
    return await this.usuarioService.updatePassword(id, usuarioDto);
  }

  @UseGuards(AuthGuardMiddleware, AuthTfaGuardMiddleware)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.delete(id);
  }

  @UseGuards(AuthGuardMiddleware, AuthTfaGuardMiddleware)
  @Put(':id/preferencias')
  async updatePreferencias(
    @Param('id') id: number,
    @Body() preferenciasDto: UpdateUsuarioPreferenciasDto
  ) {
    return await this.usuarioService.updatePreferencias(id, preferenciasDto);
  }

  @UseGuards(AuthGuardMiddleware, AuthTfaGuardMiddleware)
  @UseInterceptors(FileInterceptor('foto'))
  @Put(':id/perfil')
  async updatePerfil(
    @Param('id') id: number,
    @Body() perfilDto: UpdatePerfilDto,
    @UploadedFile() foto: Express.Multer.File
  ) {
    await this.usuarioService.exist(id);
    return await this.perfilService.update(id, perfilDto, foto);
  }
}
