const config = {
    user: 'deneme',
    password: '123',
    server: 'localhost',
    database: 'diyetDB',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
      instancename: 'SQLEXPRESS',
      trustServerCertificate: true
    },
    port: 62018,
  };

  module.exports = config;