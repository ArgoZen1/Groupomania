

module.exports = (sequelize, DataTypes) => { 
    

const user = sequelize.define("user", {
   
    name : {
        type : DataTypes.STRING,
        // autoIncrement : true,
        allowNull: false // pour que le nom soit toujours défini
    },
    firstname : {
        type : DataTypes.STRING,
        allowNull: false
    },
    email: {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true  
        
    },
    password: {
        type : DataTypes.STRING,

        allowNull: false
    },
    picture: {
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue: "./uploads/no-photo.png"
    },
    bio : {
        type : DataTypes.STRING,
        allowNull: true
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    
  
});

return user; 
};












  
