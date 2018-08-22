
module.exports = function (sequelize, DataTypes) {
    //Table for User's Messages 
    const Message = sequelize.define('Message', {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1]
            }
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });

    Message.associate = function (models) {
        Message.belongsTo(models.User, {
        });
    };

    return Message;
};