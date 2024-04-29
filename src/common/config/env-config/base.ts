import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';

export default registerAs('', () => ({
  host: process.env.HOST,
  port: process.env.PORT,
  appEnv: process.env.APP_ENV,
  secretKey: process.env.SECRET_KEY,
  db: {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logger: process.env.DB_LOGGER,
    database: process.env.DB_NAME,
  },

  appDebug: process.env.DB_DIALECT,
}));
