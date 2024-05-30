import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import DispositivoVinculado from 'src/common/database/models/dispositivo-vinculado.model';

@Injectable()
export class DispositivosService {
  constructor(
    @InjectModel(DispositivoVinculado)
    private readonly dispositivoVinculadoModel: typeof DispositivoVinculado
  ) {}

  async exist(idDispositivo: number) {
    const dispositivo = await this.dispositivoVinculadoModel.findByPk(idDispositivo);
    if (!dispositivo)
      throw new BadRequestException(`No se encontro el dispositivo con el id ${idDispositivo}`);

    return dispositivo;
  }

  async eliminarDispositivoVinculado(idUsuario: number, idDispositivo: number) {
    const dispositivoEliminado = await this.dispositivoVinculadoModel.destroy({
      where: {
        id_usuario: idUsuario,
        id_dispositivo: idDispositivo,
      },
    });

    if (!dispositivoEliminado)
      throw new BadRequestException('No se encontro un dispositivo a eliminar');

    return dispositivoEliminado;
  }
}
