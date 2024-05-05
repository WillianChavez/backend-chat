'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "ctl_fuente_tipografica", deps: []
 * createTable "ctl_opcion_menu", deps: []
 * createTable "ctl_reaccion", deps: []
 * createTable "ctl_rol", deps: []
 * createTable "ctl_tipo_archivo", deps: []
 * createTable "ctl_tipo_chat", deps: []
 * createTable "mnt_usuario", deps: []
 * createTable "mnt_mensaje", deps: [mnt_chat, mnt_usuario]
 * createTable "mnt_chat", deps: [ctl_tipo_chat]
 * createTable "mnt_doble_factor_usuario", deps: [mnt_usuario]
 * createTable "mnt_contacto_bloqueado", deps: [mnt_usuario, mnt_usuario]
 * createTable "mnt_contacto_usuario", deps: [mnt_usuario, mnt_usuario]
 * createTable "mnt_dispositivo_vinculado", deps: [mnt_usuario]
 * createTable "mnt_codigo_generado_usuario", deps: [mnt_doble_factor_usuario]
 * createTable "mnt_archivo_mensaje", deps: [ctl_tipo_archivo, mnt_mensaje]
 * createTable "mnt_lectura_mensaje", deps: [mnt_mensaje, mnt_usuario]
 * createTable "mnt_perfil", deps: [mnt_usuario]
 * createTable "mnt_preferencia_chat", deps: [mnt_chat, mnt_usuario]
 * createTable "mnt_preferencia_notificacion", deps: [mnt_usuario]
 * createTable "mnt_preferencias_usuario", deps: [ctl_fuente_tipografica, mnt_usuario]
 * createTable "mnt_reaccion_mensaje", deps: [mnt_mensaje, ctl_reaccion, mnt_usuario]
 * createTable "mnt_rol_opcion_menu", deps: [ctl_opcion_menu, ctl_rol]
 * createTable "mnt_usuario_chat", deps: [mnt_chat, ctl_rol, mnt_usuario]
 *
 **/

const info = {
    "revision": 1,
    "name": "init",
    "created": "2024-05-04T22:56:01.693Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":1,"tables":{"mnt_archivo_mensaje":{"tableName":"mnt_archivo_mensaje","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"urlArchivo":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idTipoArchivo":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_tipo_archivo","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idMensaje":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_mensaje","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_chat":{"tableName":"mnt_chat","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"descripcion":{"seqType":"Sequelize.STRING"},"fechaCreacion":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idTipoChat":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_tipo_chat","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_codigo_generado_usuario":{"tableName":"mnt_codigo_generado_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"codigo":{"seqType":"Sequelize.STRING"},"fechaExpiracion":{"seqType":"Sequelize.DATE"},"fechaCreacion":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idDobleFactorUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_doble_factor_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_contacto_bloqueado":{"tableName":"mnt_contacto_bloqueado","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idContacto":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_contacto_usuario":{"tableName":"mnt_contacto_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idContacto":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_dispositivo_vinculado":{"tableName":"mnt_dispositivo_vinculado","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombreDispositivo":{"seqType":"Sequelize.STRING"},"fecha":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_doble_factor_usuario":{"tableName":"mnt_doble_factor_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"secret":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"ctl_fuente_tipografica":{"tableName":"ctl_fuente_tipografica","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"mnt_lectura_mensaje":{"tableName":"mnt_lectura_mensaje","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"leido":{"seqType":"Sequelize.BOOLEAN"},"fechaHora":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idMensaje":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_mensaje","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_mensaje":{"tableName":"mnt_mensaje","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"mensaje":{"seqType":"Sequelize.STRING"},"fechaHora":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idChat":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_chat","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"ctl_opcion_menu":{"tableName":"ctl_opcion_menu","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"descripcion":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"mnt_perfil":{"tableName":"mnt_perfil","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"biografia":{"seqType":"Sequelize.STRING"},"foto":{"seqType":"Sequelize.STRING"},"correo":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_preferencia_chat":{"tableName":"mnt_preferencia_chat","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"fondoColor":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idChat":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_chat","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_preferencia_notificacion":{"tableName":"mnt_preferencia_notificacion","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"silenciadas":{"seqType":"Sequelize.BOOLEAN"},"activoHorarioNotificacion":{"seqType":"Sequelize.BOOLEAN"},"horaInicio":{"seqType":"Sequelize.DATE"},"horaFin":{"seqType":"Sequelize.DATE"},"fondoColor":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_preferencias_usuario":{"tableName":"mnt_preferencias_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"temaOscuro":{"seqType":"Sequelize.BOOLEAN"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idFuente":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_fuente_tipografica","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_reaccion_mensaje":{"tableName":"mnt_reaccion_mensaje","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"fechaReaccion":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idMensaje":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_mensaje","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idReaccion":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_reaccion","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"ctl_reaccion":{"tableName":"ctl_reaccion","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"valor":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"mnt_rol_opcion_menu":{"tableName":"mnt_rol_opcion_menu","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idOpcionMenu":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_opcion_menu","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idRol":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_rol","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"ctl_rol":{"tableName":"ctl_rol","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"descripcion":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"ctl_tipo_archivo":{"tableName":"ctl_tipo_archivo","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"ctl_tipo_chat":{"tableName":"ctl_tipo_chat","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"mnt_usuario_chat":{"tableName":"mnt_usuario_chat","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idChat":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_chat","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idRol":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_rol","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"IdUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_usuario":{"tableName":"mnt_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"contra":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "ctl_fuente_tipografica",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombre": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ctl_opcion_menu",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombre": {
                    "type": Sequelize.STRING
                },
                "descripcion": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ctl_reaccion",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "valor": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ctl_rol",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombre": {
                    "type": Sequelize.STRING
                },
                "descripcion": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ctl_tipo_archivo",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombre": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ctl_tipo_chat",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombre": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_usuario",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombre": {
                    "type": Sequelize.STRING
                },
                "contra": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_mensaje",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "mensaje": {
                    "type": Sequelize.STRING
                },
                "fechaHora": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idChat": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_chat",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_chat",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "descripcion": {
                    "type": Sequelize.STRING
                },
                "fechaCreacion": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idTipoChat": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ctl_tipo_chat",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_doble_factor_usuario",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "secret": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_contacto_bloqueado",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idContacto": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_contacto_usuario",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idContacto": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_dispositivo_vinculado",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombreDispositivo": {
                    "type": Sequelize.STRING
                },
                "fecha": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_codigo_generado_usuario",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "codigo": {
                    "type": Sequelize.STRING
                },
                "fechaExpiracion": {
                    "type": Sequelize.DATE
                },
                "fechaCreacion": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idDobleFactorUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_doble_factor_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_archivo_mensaje",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "urlArchivo": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idTipoArchivo": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ctl_tipo_archivo",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idMensaje": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_mensaje",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_lectura_mensaje",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "leido": {
                    "type": Sequelize.BOOLEAN
                },
                "fechaHora": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idMensaje": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_mensaje",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_perfil",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombre": {
                    "type": Sequelize.STRING
                },
                "biografia": {
                    "type": Sequelize.STRING
                },
                "foto": {
                    "type": Sequelize.STRING
                },
                "correo": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_preferencia_chat",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "nombre": {
                    "type": Sequelize.STRING
                },
                "fondoColor": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idChat": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_chat",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_preferencia_notificacion",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "silenciadas": {
                    "type": Sequelize.BOOLEAN
                },
                "activoHorarioNotificacion": {
                    "type": Sequelize.BOOLEAN
                },
                "horaInicio": {
                    "type": Sequelize.DATE
                },
                "horaFin": {
                    "type": Sequelize.DATE
                },
                "fondoColor": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_preferencias_usuario",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "temaOscuro": {
                    "type": Sequelize.BOOLEAN
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idFuente": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ctl_fuente_tipografica",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_reaccion_mensaje",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "fechaReaccion": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idMensaje": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_mensaje",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idReaccion": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ctl_reaccion",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_rol_opcion_menu",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idOpcionMenu": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ctl_opcion_menu",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idRol": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ctl_rol",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "mnt_usuario_chat",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "idChat": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_chat",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "idRol": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ctl_rol",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "IdUsuario": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "mnt_usuario",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "dropTable",
        params: ["mnt_mensaje"]
    },
    {
        fn: "dropTable",
        params: ["mnt_chat"]
    },
    {
        fn: "dropTable",
        params: ["mnt_doble_factor_usuario"]
    },
    {
        fn: "dropTable",
        params: ["mnt_contacto_bloqueado"]
    },
    {
        fn: "dropTable",
        params: ["mnt_contacto_usuario"]
    },
    {
        fn: "dropTable",
        params: ["mnt_dispositivo_vinculado"]
    },
    {
        fn: "dropTable",
        params: ["mnt_codigo_generado_usuario"]
    },
    {
        fn: "dropTable",
        params: ["mnt_archivo_mensaje"]
    },
    {
        fn: "dropTable",
        params: ["mnt_lectura_mensaje"]
    },
    {
        fn: "dropTable",
        params: ["mnt_perfil"]
    },
    {
        fn: "dropTable",
        params: ["mnt_preferencia_chat"]
    },
    {
        fn: "dropTable",
        params: ["mnt_preferencia_notificacion"]
    },
    {
        fn: "dropTable",
        params: ["mnt_preferencias_usuario"]
    },
    {
        fn: "dropTable",
        params: ["mnt_reaccion_mensaje"]
    },
    {
        fn: "dropTable",
        params: ["mnt_rol_opcion_menu"]
    },
    {
        fn: "dropTable",
        params: ["mnt_usuario_chat"]
    },
    {
        fn: "dropTable",
        params: ["ctl_fuente_tipografica"]
    },
    {
        fn: "dropTable",
        params: ["ctl_opcion_menu"]
    },
    {
        fn: "dropTable",
        params: ["ctl_reaccion"]
    },
    {
        fn: "dropTable",
        params: ["ctl_rol"]
    },
    {
        fn: "dropTable",
        params: ["ctl_tipo_archivo"]
    },
    {
        fn: "dropTable",
        params: ["ctl_tipo_chat"]
    },
    {
        fn: "dropTable",
        params: ["mnt_usuario"]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
