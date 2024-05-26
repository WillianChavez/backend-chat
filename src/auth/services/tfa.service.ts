import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hmac, randomBytes } from 'otp-io/crypto-node';
import { exportKey, importKey, TOTP, generateKey } from 'otp-io';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';
import DobleFactorUsuario from 'src/common/database/models/doble-factor-usuario.model';
import Usuario from 'src/common/database/models/usuario.model';
import Perfil from 'src/common/database/models/perfil.model';
import { MailService } from 'src/common/mail/mail.service';
import CodigoGeneradoUsuario from 'src/common/database/models/codigo-generado-usuario.model';

@Injectable()
export class TfaService {
  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
    @InjectModel(DobleFactorUsuario)
    private dobleFactorUsuarioModel: typeof DobleFactorUsuario,
    @InjectModel(CodigoGeneradoUsuario)
    private codigoGeneradoUsuarioModel: typeof CodigoGeneradoUsuario,
    private mailService: MailService
  ) {}

  totp(secret: string) {
    const secretKey = importKey(secret);

    return new TOTP(hmac, {
      secret: secretKey,
      stepSeconds: 60 * 60 * 4, // 4 horas
    });
  }

  /**
   * Funcion para verificar si necesita segundo factor de autenticación
   */
  async needTfa(idUsuario: number) {
    const dobleFactor = await this.dobleFactorUsuarioModel.findOne({
      where: {
        idUsuario,
      },
    });
    return dobleFactor !== null;
  }

  /**
   * Funcion para enviar un código de verificación al usuario
   * por correo electrónico
   */
  async sendTfaCode(idUsuario: number, idDispositivo: number) {
    const usuario = await this.usuarioModel.findByPk(idUsuario, {
      include: [
        {
          model: DispositivoVinculado,
          where: {
            id: idDispositivo,
          },
        },
        {
          model: DobleFactorUsuario,
        },
        {
          model: Perfil,
        },
      ],
    });

    const code = await this.totp(usuario.dobleFactor.secret).generateCode();

    const codigoGenerado = await this.codigoGeneradoUsuarioModel.findOne({
      where: {
        idDobleFactorUsuario: usuario.dobleFactor.id,
        codigo: code,
      },
    });

    if (!codigoGenerado) {
      await this.codigoGeneradoUsuarioModel.create({
        idUsuario,
        codigo: code,
        fechaExpiracion: new Date(Date.now() + 60 * 60 * 4 * 1000), // Date.now() + 4horas
        idDobleFactorUsuario: usuario.dobleFactor.id,
      });
    }

    this.mailService.sendTextMail(
      usuario.perfil.correo,
      'Código de verificación',
      `Su código de verificación es: ${code}`
    );
  }

  /**
   * Funcion para verificar el código de tfa
   */
  async verifyTfaCode(idUsuario: number, idDispositivo: number, codigo: string) {
    const usuario = await this.usuarioModel.findByPk(idUsuario, {
      include: [
        {
          model: DispositivoVinculado,
          where: {
            id: idDispositivo,
          },
        },
        {
          model: DobleFactorUsuario,
        },
        {
          model: Perfil,
        },
      ],
    });

    const codigoGenerado = await this.codigoGeneradoUsuarioModel.findOne({
      where: {
        codigo: codigo,
        idDobleFactorUsuario: usuario.dobleFactor.id,
      },
    });

    if (!codigoGenerado)
      throw new UnauthorizedException({
        message: 'Código de verificación incorrecto.',
      });

    const isValid = await this.totp(usuario.dobleFactor.secret).checkCode(codigo);

    if (isValid) codigoGenerado.destroy();

    return isValid;
  }

  /**
   * Create a new secret for the user
   */
  async createTfaSecret(idUsuario: number) {
    let dobleFactor = await this.dobleFactorUsuarioModel.findOne({
      where: {
        idUsuario,
      },
    });

    if (!dobleFactor) {
      dobleFactor = await this.dobleFactorUsuarioModel.create({
        idUsuario,
      });
    }

    const secret = exportKey(generateKey(randomBytes, 20));
    dobleFactor.secret = secret;
    await dobleFactor.save();
    return dobleFactor;
  }

  async disableTfa(idUsuario: number) {
    const dobleFactor = await this.dobleFactorUsuarioModel.findOne({
      where: {
        idUsuario,
      },
    });

    if (dobleFactor) {
      await dobleFactor.destroy();
    }
  }
}
