import { Injectable } from '@nestjs/common';
import Usuario from 'src/common/database/models/usuario.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  /*
   * Esta función se encarga de autenticar a un usuario
   * Recibe como parámetros el nombre de usuario y la contraseña
   * Devuelve un booleano que indica si la autenticación fue exitosa o no
   */
  async auth(user: string, password: string): Promise<boolean> {
    /*
     * Buscar el usuario en la base de datos
     */
    const usuario = await Usuario.findOne({
      where: {
        nombre: user,
      }
    });

    /*
     * Si el usuario no existe, la función devolverá false
     */
    if (!usuario) return false;

    /*
     * Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
     * Si las contraseñas coinciden, la función devolverá true
     */
    return await bcrypt.compare(password, usuario.contra)
  }
}
