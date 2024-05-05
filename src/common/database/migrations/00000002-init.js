'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "descripcion" from table "mnt_chat"
 *
 **/

const info = {
    "revision": 2,
    "name": "init",
    "created": "2024-05-04T22:56:56.459Z",
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
                state: '{"revision":2,"tables":{"mnt_archivo_mensaje":{"tableName":"mnt_archivo_mensaje","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"urlArchivo":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idTipoArchivo":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_tipo_archivo","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idMensaje":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_mensaje","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_chat":{"tableName":"mnt_chat","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"fechaCreacion":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idTipoChat":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_tipo_chat","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_codigo_generado_usuario":{"tableName":"mnt_codigo_generado_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"codigo":{"seqType":"Sequelize.STRING"},"fechaExpiracion":{"seqType":"Sequelize.DATE"},"fechaCreacion":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idDobleFactorUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_doble_factor_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_contacto_bloqueado":{"tableName":"mnt_contacto_bloqueado","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idContacto":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_contacto_usuario":{"tableName":"mnt_contacto_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idContacto":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_dispositivo_vinculado":{"tableName":"mnt_dispositivo_vinculado","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombreDispositivo":{"seqType":"Sequelize.STRING"},"fecha":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_doble_factor_usuario":{"tableName":"mnt_doble_factor_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"secret":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"ctl_fuente_tipografica":{"tableName":"ctl_fuente_tipografica","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"mnt_lectura_mensaje":{"tableName":"mnt_lectura_mensaje","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"leido":{"seqType":"Sequelize.BOOLEAN"},"fechaHora":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idMensaje":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_mensaje","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_mensaje":{"tableName":"mnt_mensaje","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"mensaje":{"seqType":"Sequelize.STRING"},"fechaHora":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idChat":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_chat","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"ctl_opcion_menu":{"tableName":"ctl_opcion_menu","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"descripcion":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"mnt_perfil":{"tableName":"mnt_perfil","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"biografia":{"seqType":"Sequelize.STRING"},"foto":{"seqType":"Sequelize.STRING"},"correo":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_preferencia_chat":{"tableName":"mnt_preferencia_chat","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"fondoColor":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idChat":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_chat","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_preferencia_notificacion":{"tableName":"mnt_preferencia_notificacion","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"silenciadas":{"seqType":"Sequelize.BOOLEAN"},"activoHorarioNotificacion":{"seqType":"Sequelize.BOOLEAN"},"horaInicio":{"seqType":"Sequelize.DATE"},"horaFin":{"seqType":"Sequelize.DATE"},"fondoColor":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_preferencias_usuario":{"tableName":"mnt_preferencias_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"temaOscuro":{"seqType":"Sequelize.BOOLEAN"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idFuente":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_fuente_tipografica","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_reaccion_mensaje":{"tableName":"mnt_reaccion_mensaje","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"fechaReaccion":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idMensaje":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_mensaje","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idReaccion":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_reaccion","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"ctl_reaccion":{"tableName":"ctl_reaccion","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"valor":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"mnt_rol_opcion_menu":{"tableName":"mnt_rol_opcion_menu","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idOpcionMenu":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_opcion_menu","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idRol":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_rol","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"ctl_rol":{"tableName":"ctl_rol","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"descripcion":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"ctl_tipo_archivo":{"tableName":"ctl_tipo_archivo","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"ctl_tipo_chat":{"tableName":"ctl_tipo_chat","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}},"mnt_usuario_chat":{"tableName":"mnt_usuario_chat","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"idChat":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_chat","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"idRol":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"ctl_rol","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"IdUsuario":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"mnt_usuario","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"mnt_usuario":{"tableName":"mnt_usuario","schema":{"id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"autoIncrement":true},"nombre":{"seqType":"Sequelize.STRING"},"contra":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false}},"indexes":{}}}}'
            }],
            {}
        ]
    },



    {
        fn: "removeColumn",
        params: ["mnt_chat", "descripcion"]
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
        fn: "addColumn",
        params: [
            "mnt_chat",
            "descripcion",
            {
                "type": Sequelize.STRING
            }
        ]
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
