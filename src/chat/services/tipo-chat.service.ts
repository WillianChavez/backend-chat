import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import TipoChat from 'src/common/database/models/tipo-chat.model';

@Injectable()
export class TipoChatService {

  constructor(
    @InjectModel(TipoChat)
    private tipoChatModel: typeof TipoChat,
  ) { }

  async listAll(): Promise<TipoChat[]> {
    return await this.tipoChatModel.findAll();
  }
}
