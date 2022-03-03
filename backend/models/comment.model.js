const { DB } = require("./index")

module.exports = (sequelize, DataTypes) => {


  const comment = sequelize.define("comment", {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },


  }, {
    sequelize,
    modelName: 'comment'

  });

  return comment;
};

;