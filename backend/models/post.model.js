


module.exports = (sequelize, DataTypes) => {


    const post = sequelize.define("post", {
       
    
        picture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        } 
       
       

    });

  

    return post;
};
