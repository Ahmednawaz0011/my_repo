module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "53cr3t@786",
  DB: "test",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
