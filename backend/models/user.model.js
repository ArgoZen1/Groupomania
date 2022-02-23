

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
    likes : {
        type : DataTypes.STRING,
        allowNull: true
    }
    
  
});

return user; 
};












  
