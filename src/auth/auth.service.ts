import { Injectable, UnauthorizedException } from '@nestjs/common';
import Usuario from 'src/common/database/models/usuario.model';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth-dto';
import { InjectModel } from '@nestjs/sequelize';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/common/config/services/env-config.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
    @InjectModel(DispositivoVinculado)
    private dispositivoVinculadoModel: typeof DispositivoVinculado,
    private jwtService: JwtService,
    private envService: EnvConfigService,
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

    return usuario.hidePassword();
  }

  /**
   * Funcion para generar un token de autenticación
   * @param {Usuario} usuario - Usuario al que se le generará el token
   */
  async generarToken(usuario: Usuario) {
    // return usuario;
    return await this.jwtService.signAsync(usuario, {
      secret: this.envService.secretKey ?? 'secret'
    });
  }

  /**
   * Función para vincular un dispositivo a un usuario
   * 
   * @param idUsuario 
   * @param nombreDispositivo 
   * @param token 
   * @returns 
   */
  async vincularDispositivo(idUsuario: number, nombreDispositivo: string, token: string) {
    return await this.dispositivoVinculadoModel.create({
      idUsuario,
      nombreDispositivo,
      token,
    });
  }
}
