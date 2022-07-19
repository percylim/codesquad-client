const env = {
    database: 'loizenaidb',
    username: env.DB_USER || 'sql6424048',
    password: env.DB_PASSWORD || 'pl123456',
    host: env.DB_HOST || 'sql6.freemysqlhosting.net',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };


  module.exports = env;
