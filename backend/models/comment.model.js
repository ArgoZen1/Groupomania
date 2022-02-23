module.exports = (sequelize, DataTypes) => {


    const comment = sequelize.define("comment", {
       
        postId: {
            type: DataTypes.INTEGER  
        },
        userId: {
            type: DataTypes.INTEGER
        },
        message: {
            type: DataTypes.STRING,  
        }
        
    });

    return comment;
};