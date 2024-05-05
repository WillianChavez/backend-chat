import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';
import Chat from '../../common/database/models/chat.model';
import { InjectModel } from '@nestjs/sequelize';
import UsuarioChat from 'src/common/database/models/usuario-chat.model';
import PreferenciaChat from 'src/common/database/models/preferencia-chat.model';
import TipoChat from 'src/common/database/models/tipo-chat.model';
import Usuario from 'src/common/database/models/usuario.model';
import Mensaje from 'src/common/database/models/mensaje.model';
import LecturaMensaje from 'src/common/database/models/lectura-mensaje.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateGroupChatDto } from '../dto/group-chat.dto';

@Injectable()
export class ChatService {

  constructor(
    @InjectModel(Chat)
    private chatModel: typeof Chat,

    @InjectModel(UsuarioChat)
    private usuarioChatModel: typeof UsuarioChat,

    @InjectModel(PreferenciaChat)
    private preferenciaChatModel: typeof PreferenciaChat,

    @InjectModel(TipoChat)
    private tipoChatModel: typeof TipoChat,

    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,

    @InjectModel(Mensaje)
    private mensajeModel: typeof Mensaje,
  ) { }

  async create(createChatDto: CreateChatDto) {
    const { idUsuario, idTipoChat, nombre } = createChatDto;

    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new BadRequestException('Usuario no encontrado');

    const tipoChat = await this.tipoChatModel.findByPk(idTipoChat);
    if (!tipoChat) throw new BadRequestException('Tipo de chat no encontrado');

    const newChat = await this.chatModel.create({
      idTipoChat,
    });






  }

  async findAll(idUsuario?: number) {
    const filterUsuario = {}

    if (idUsuario) filterUsuario['idUsuario'] = idUsuario;

    // sql para obtener la cantidad de mensajes no leidos de un chat
    const sqlMensajesNoLeidos = `
    (SELECT COUNT(*)
    FROM mnt_mensaje m
    JOIN mnt_lectura_mensaje lm ON m.id = lm.idMensaje
    WHERE m.idChat = mnt_chat.id AND lm.leido = false
    )`;

    const chats = await this.chatModel.findAll({
      attributes: [[Sequelize.literal(sqlMensajesNoLeidos), 'mensajesNoLeidos']],
      include: [
        {
          model: UsuarioChat,
          where: filterUsuario

        },
        {
          model: PreferenciaChat,
        },
        {
          model: TipoChat
        },
        {
          model: Mensaje,
          order: [['fechaCreacion', 'DESC']],
          limit: 1,
        },
      ]
    });


    return chats;
  }

  async findOne(id: number) {
    try {
      const chat = await this.chatModel.findByPk(id, {
        include: [
          {
            model: UsuarioChat,
          },
          {
            model: PreferenciaChat,
          },
          {
            model: TipoChat
          },
          {
            model: Mensaje,
            include: [
              {
                model: Usuario,
              },
              {
                model: LecturaMensaje,
              },
            ],
          },
        ]
      });

      return chat;
    } catch (error) {
      throw new BadRequestException('Chat no encontrado');
    }
  }

  async createGroupChat(createGroupChatDto: CreateGroupChatDto) {
    try {

      const { nombre, idsUsuarios } = createGroupChatDto;

      const tipoChatGrupal = await this.tipoChatModel.findOne({
        where: { nombre: 'Grupal' }
      });

      if (!tipoChatGrupal) throw new BadRequestException('Tipo de chat grupal no encontrado');

      const newChat = await this.chatModel.create({
        idTipoChat: tipoChatGrupal.id,
      });

      const promiseUsuariosChat = idsUsuarios.map(idUsuario => {
        this.usuarioModel.findByPk(idUsuario).then(usuario => {
          if (!usuario) throw new BadRequestException('Usuario no encontrado');

          return this.usuarioChatModel.create({
            idChat: newChat.id,
            idUsuario,
          });
        }).catch(error => {
          throw error;
        });
      });

      await Promise.all(promiseUsuariosChat);

      const promisePreferenciasChat = idsUsuarios.map(idUsuario => {
        this.preferenciaChatModel.create({
          idChat: newChat.id,
          idUsuario,
          nombre,
          fondoColor: '#FFFFFF',
        });
      });

      await Promise.all(promisePreferenciasChat);

      return newChat;
    } catch (error) {
      throw new BadRequestException('Error al crear chat grupal');
    }
  }
}
