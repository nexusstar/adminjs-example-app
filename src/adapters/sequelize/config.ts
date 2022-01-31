import { Sequelize } from 'sequelize';

const config = {
  test: {
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    port: 5432,
    database: 'database_test',
    host: 'postgres',
    dialect: 'postgres',
  },
  // Psql
  development: {
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DATABASE || 'adminjs_example',
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE as string,
    host: process.env.POSTGRES_HOST as string,
    dialect: 'postgres',
  },
};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelizeConnection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  },
);

// Testing the connection
try {
  sequelizeConnection.authenticate();
  console.log('Connection has been established successfully.'); // eslint-disable-line no-console
} catch (error) {
  console.error('Unable to connect to the database:', error); // eslint-disable-line no-console
}

export default sequelizeConnection;
