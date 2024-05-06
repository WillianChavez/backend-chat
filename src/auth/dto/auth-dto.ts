import { IsNotEmpty, IsString } from "class-validator";
/**
 * @module auth/dto/AuthDto
 * 
 * @description DTO para la autenticación de usuarios
 * 
 * @property {string} username - Nombre de usuario
 * @property {string} password - Contraseña del usuario
 * 
 * @returns {AuthDto} - DTO para la autenticación de usuarios
 * 
 * @example
 * {
 *   "username": "usuario",
 *   "password": "contraseña"
 * }
 * 
 */
export class AuthDto {
  /**
   * @description Nombre de usuario
   * @var {string} username
   */
  @IsString({
    message: 'El nombre de usuario debe ser una cadena de texto.'
  })
  @IsNotEmpty({
    message: 'El nombre de usuario es requerido.',
    context: {
      targetName: 'Usuario',
      object: 'auth',
      property: 'username'
    }
  })
  username: string;

  /**
   * @description Contraseña del usuario
   * @var {string} password
   */
  @IsString({
    message: 'La contraseña debe ser una cadena de texto.'
  })
  @IsNotEmpty({
    message: 'La contraseña es requerida.'
  })
  password: string;

  /**
   * @description Nombre del dispositivo
   * @var {string} nombreDispositivo
   */
  @IsString({
    message: 'El nombre del dispositivo debe ser una cadena de texto.'
  })
  @IsNotEmpty({
    message: 'El nombre del dispositivo es requerido.'
  })
  nombreDispositivo: string;
}