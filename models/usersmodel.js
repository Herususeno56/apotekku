const sequeleze = require('sequelize')
const db = require('../config/db')

const usersmodel = db.define(
   "users",
   {
    Name: {type:sequeleze.STRING},
    Email: {type:sequeleze.STRING},
    NIP: {type:sequeleze.STRING},
    Password: {type:sequeleze.STRING},
    role: {type:sequeleze.STRING}
   }
);

module.exports = usersmodel