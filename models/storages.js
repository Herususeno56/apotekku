const sequeleze = require('sequelize')
const db = require('../config/db')

const storage = db.define(
   "storage",
   {
    Name: {type:sequeleze.STRING}
   },
   {
      id: {type:sequeleze.INTEGER}
     }
);

module.exports = storage