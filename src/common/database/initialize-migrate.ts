/* eslint-disable @typescript-eslint/no-var-requires */
// import dotenv from 'dotenv';
const dotenv = require('dotenv');
const path = require('path');
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration-lts';

dotenv.config();

const initializeMigrate = async () => {
  const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    dialect: process.env.DB_DIALECT as Dialect,
    modelPaths: [path.join(__dirname + '/models/*.model.{ts,js}')],
    logging: false,
  });

  await SequelizeTypescriptMigration.makeMigration(sequelize, {
    outDir: path.join(__dirname + '/migrations'),
    migrationName: 'init',
    preview: false,
  });
};

initializeMigrate();
