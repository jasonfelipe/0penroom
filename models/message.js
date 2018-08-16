
module.exports = function(sequelize, DataTypes) {
    //Table for User's Messages 
    const Message = sequelize.define('Message', {
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1]
            }
        }
        
    });

    Message.associate = function (models){
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Message;
};