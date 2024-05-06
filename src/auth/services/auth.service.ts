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
    private tfaService: TfaService,
  ) { }

  /*
   * Esta función se encarga de autenticar a un usuario
   * Recibe como parámetros el nombre de usuario y la contraseña
   * Devuelve un booleano que indica si la autenticación fue exitosa o no
   */
  async auth(auth: AuthDto) {
    /*
     * Buscar el usuario en la base de datos
     */
    const usuario = await this.usuarioModel.findOne({
      where: {
        nombre: auth.username,
      }
    });

    /*
     * Si el usuario no existe, la función devolverá false
     */
    if (!usuario) {
      throw new UnauthorizedException({
        message: 'Usuario o contraseña incorrectos.'
      });
    };

    /*
     * Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
     * Si las contraseñas coinciden, la función devolverá true
     */
    if (!(await bcrypt.compare(auth.password, usuario.contra))) {
      throw new UnauthorizedException({
        message: 'Usuario o contraseña incorrectos.'
      });
    }

    /**
     * Verificar si necesita segundo factor de autenticación
     */
    const tfaRequerido = await this.tfaService.needTfa(usuario.id);

    return {
      ...usuario.hidePassword(),
      tfaRequerido,
      tfaPasado: !tfaRequerido
    } as UserTfaDto;
  }

  /**
   * Funcion para generar un token de autenticación
   * @param {UserTfaDto} usuario - Usuario al que se le generará el token
   */
  async createToken(usuario: UserTfaDto) {
    return await this.jwtService.signAsync(usuario, {
      secret: this.envService.secretKey ?? 'secret'
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
}
