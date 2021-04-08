const dbConfig = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.brand = require("./brand")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.address = require("./address")(sequelize, Sequelize);
db.cart = require("./cart")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.contact = require("./contact")(sequelize, Sequelize);
db.merchant = require("./merchant")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);

module.exports = db;