const Sequelize = require('sequelize');

const config = require("../config/db.config");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, { dialect: 'mysql', host: 'localhost' });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, Sequelize)
db.posts = require("../models/post.model")(sequelize, Sequelize)
db.comments = require('./comment.model')(sequelize, Sequelize)

db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);

db.posts.hasMany(db.comments)
db.comments.belongsTo(db.posts)

db.users.hasMany(db.comments)
db.comments.belongsTo(db.users)

module.exports = db;