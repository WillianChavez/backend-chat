import { Injectable, UnauthorizedException } from '@nestjs/common';
import Usuario from 'src/common/database/models/usuario.model';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../dto/auth-dto';
import { InjectModel } from '@nestjs/sequelize';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/common/config/services/env-config.service';
import { TfaService } from './tfa.service';
import { UserTfaDto } from '../dto/usertfa-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
    @InjectModel(DispositivoVinculado)
    private dispositivoVinculadoModel: typeof DispositivoVinculado,
    private jwtService: JwtService,
    private envService: EnvConfigService,
    private tfaService: TfaService
  ) {}

  async auth(auth: AuthDto) {
    const usuario = await this.usuarioModel.findOne({
      where: {
        nombre: auth.username,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException({
        message: 'Usuario o contraseña incorrectos.',
      });
    }

    if (!(await bcrypt.compare(auth.password, usuario.contra))) {
      throw new UnauthorizedException({
        message: 'Usuario o contraseña incorrectos.',
      });
    }

    const tfaRequerido = await this.tfaService.needTfa(usuario.id);

    const userTfaDto: UserTfaDto = {
      ...usuario.hidePassword(),
      tfaRequerido,
      tfaPasado: !tfaRequerido,
    };

    return userTfaDto;
  }

  /**
   * Funcion para generar un token de autenticación
   * @param {UserTfaDto} usuario - Usuario al que se le generará el token
   */
  async createToken(usuario: UserTfaDto) {
    return await this.jwtService.signAsync(usuario, {
      secret: this.envService.secretKey ?? 'secret',
    });
  }

  /**
   * Funcion para actualizar el token de un usuario vinculado
   * @param {DispositivoVinculado} dispositivo - Dispositivo vinculado al usuario
   * @param {string} token - Token de autenticación
   * @params {boolean} tfaPasado - Indica si el segundo factor de autenticación fue pasado
   */
  async actualizarTokenDispositivo(idDispositivo: number, token: string, tfaPasado: boolean) {
    const dispositivo = await this.dispositivoVinculadoModel.findByPk(idDispositivo);

    // Regerar jwt y actualizar los datos
    // Datos jwt
    const datosJwt = this.jwtService.decode(dispositivo.token) as UserTfaDto;
    datosJwt.tfaPasado = tfaPasado;

    // Generar nuevo token
    const nuevoToken = await this.createToken(datosJwt);

    // Actualizar token
    dispositivo.token = nuevoToken;

    // Guardar cambios
    return await dispositivo.save();
  }

  /**
   * Función para vincular un dispositivo a un usuario
   *
   * @param idUsuario
   * @param nombreDispositivo
   * @param token
   * @returns
   */
  async vincularDispositivo(usuario: UserTfaDto, nombreDispositivo: string) {
    const dispositivo = await this.dispositivoVinculadoModel.create({
      idUsuario: usuario.id,
      nombreDispositivo,
      token: null,
    });

    /**
     * Asingar el id del dispositivo al usuario
     */
    usuario.idDispositivo = dispositivo.id;

    /**
     * Crear un nuevo token
     */
    const nuevoToken = await this.createToken(usuario);

    /**
     * Actualizar el token del dispositivo
     */
    dispositivo.token = nuevoToken;
    return await dispositivo.save();
  }

  async decryptoToken(token: string) {
    return this.jwtService.decode(token) as UserTfaDto;
  }

  async logout(id: number, idDispositivo: number) {
    const dispositivo = await this.dispositivoVinculadoModel.findByPk(idDispositivo);

    if (dispositivo.idUsuario !== id) {
      throw new UnauthorizedException({
        message: 'No tienes permisos para realizar esta acción.',
      });
    }

    dispositivo.token = null;
    await dispositivo.save();
  }
}
