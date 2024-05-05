import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Usuario from 'src/common/database/models/usuario.model';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([
    Usuario,
    DispositivoVinculado
  ])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule { }
