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
import { UpdatePreferenciaChatDto } from '../dto/preferencia-chat.dto';
import Reaccion from 'src/common/database/models/reaccion.model';

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

    @InjectModel(Reaccion)
    private reaccionModel: typeof Reaccion,

    private sequelize: Sequelize
  ) {}

  async create(createChatDto: CreateChatDto, file: Express.Multer.File | undefined = undefined) {
    const { idUsuarios, idTipoChat, nombre } = createChatDto;

    const tipoChat = await this.tipoChatModel.findByPk(idTipoChat);
    if (!tipoChat) throw new BadRequestException('Tipo de chat no encontrado');

    const usuariosPromise = idUsuarios.map(async (idUsuario) => {
      const usuario = await this.usuarioModel.findByPk(idUsuario);
      if (!usuario) throw new BadRequestException('Usuario no encontrado');
      return usuario;
    });

    const usuarios = await Promise.all(usuariosPromise);

    if (tipoChat.nombre === 'Grupal') {
      const newGroupChat: CreateGroupChatDto = {
        nombre,
        idsUsuarios: idUsuarios,
      };

      const newChat = await this.createGroupChat(newGroupChat);
      return newChat;
    }

    if (idUsuarios.length > 2)
      throw new BadRequestException('No se puede crear un chat privado con más de 2 usuarios');

    const t = await this.sequelize.transaction();
    try {
      const newChat = await this.chatModel.create(
        {
          idTipoChat: tipoChat.id,
          uriFoto: file ? file.filename : null,
        },
        { transaction: t }
      );

      const usuarioPrincipal = usuarios[0];
      const usuarioSecundario = usuarios[1];

      const preferenciaChatPrincipal = await this.preferenciaChatModel.create(
        {
          idChat: newChat.id,
          idUsuario: usuarioPrincipal.id,
          nombre: usuarioSecundario.nombre,
          fondoColor: '#FFFFFF',
        },
        { transaction: t }
      );

      const preferenciaChatSecundario = await this.preferenciaChatModel.create(
        {
          idChat: newChat.id,
          idUsuario: usuarioSecundario.id,
          nombre: usuarioPrincipal.nombre,
          fondoColor: '#FFFFFF',
        },
        { transaction: t }
      );

      const usuarioChatPrincipal = await this.usuarioChatModel.create(
        {
          idChat: newChat.id,
          idUsuario: usuarioPrincipal.id,
        },
        { transaction: t }
      );

      const usuarioChatSecundario = await this.usuarioChatModel.create(
        {
          idChat: newChat.id,
          idUsuario: usuarioSecundario.id,
        },
        { transaction: t }
      );

      await t.commit();
      return {
        chat: newChat,
        preferencias: [preferenciaChatPrincipal, preferenciaChatSecundario],
        usuarios: [usuarioChatPrincipal, usuarioChatSecundario],
      };
    } catch (error) {
      await t.rollback();
    }
  }

  async findAll(idUsuario?: number) {
    const filterUsuario = {};

    if (idUsuario) filterUsuario['idUsuario'] = idUsuario;

    // sql para obtener la cantidad de mensajes no leidos de un chat
    const sqlMensajesNoLeidos = `
    (SELECT COUNT(*)
    FROM mnt_mensaje as m
    JOIN mnt_lectura_mensaje as lm ON m.id = lm.id_mensaje
    WHERE m.id_chat = "Chat".id AND lm.leido = false
    )`;

    const chats = await this.chatModel.findAll({
      attributes: [[this.sequelize.literal(sqlMensajesNoLeidos), 'mensajesNoLeidos']],
      include: [
        {
          model: UsuarioChat,
          where: filterUsuario,
          attributes: [],
        },
        {
          model: PreferenciaChat,
          attributes: ['nombre', 'fondo_color', 'id_usuario'],
          where: filterUsuario,
        },
        {
          model: TipoChat,
          attributes: ['nombre'],
        },
        {
          model: Mensaje,
          order: [['fecha_hora', 'DESC']],
          limit: 1,
          required: false,
        },
      ],
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
            model: TipoChat,
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
        ],
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
        where: { nombre: 'Grupal' },
      });

      if (!tipoChatGrupal) throw new BadRequestException('Tipo de chat grupal no encontrado');

      const newChat = await this.chatModel.create({
        id_tipo_chat: tipoChatGrupal.id,
      });

      const promiseUsuariosChat = idsUsuarios.map((idUsuario) => {
        this.usuarioModel
          .findByPk(idUsuario)
          .then((usuario) => {
            if (!usuario) throw new BadRequestException('Usuario no encontrado');

            return this.usuarioChatModel.create({
              id_chat: newChat.id,
              id_usuario: idUsuario,
            });
          })
          .catch((error) => {
            throw error;
          });
      });

      await Promise.all(promiseUsuariosChat);

      const promisePreferenciasChat = idsUsuarios.map((idUsuario) => {
        this.preferenciaChatModel.create({
          id_chat: newChat.id,
          id_usuario: idUsuario,
          nombre,
          fondo_color: '#FFFFFF',
        });
      });

      await Promise.all(promisePreferenciasChat);

      return newChat;
    } catch (error) {
      throw new BadRequestException('Error al crear chat grupal');
    }
  }

  async updatePreferenciaChat(id: number, updatePreferenciaChatDto: UpdatePreferenciaChatDto) {
    const preferenciaChat = await this.preferenciaChatModel.findByPk(id);
    if (!preferenciaChat) throw new BadRequestException('Preferencia de chat no encontrada');

    await preferenciaChat.update(updatePreferenciaChatDto);
    await preferenciaChat.save();

    return preferenciaChat;
  }

  async listReacciones() {
    const reacciones = await this.reaccionModel.findAll();
    return reacciones;
  }
}
