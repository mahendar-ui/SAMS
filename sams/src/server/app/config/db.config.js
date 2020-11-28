const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
if(db.sequelize){
console.log("connection successfully")
}else{
  console.log("connection not successfull")
}
//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize);
//db.auth = require('../model/auth.model.js')(sequelize,Sequelize);
db.employees = require('../model/employee.model.js')(sequelize, Sequelize);

module.exports = db;