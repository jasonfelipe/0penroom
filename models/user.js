
module.exports = function (sequelize, DataTypes) {
    //Table for the User Database. Will add more columns later.
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'NAME IS ALREADY IN USE!'
            },
            allowNull: false,
            validate: {
                len: [1, 12],
                
            }
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Message, {
            onDelete: 'cascade'
        });
    };

    User.associate = function (models) {
        User.hasMany(models.Post, {
            onDelete: 'cascade'
        });
    };

    return User;
};