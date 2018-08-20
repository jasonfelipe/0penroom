
module.exports = function (sequelize, DataTypes) {
    //Table for the User Database. Will add more columns later.
    var User = sequelize.define('User', {
        name: DataTypes.STRING
    });

    User.associate = function (models){
        User.hasMany(models.Message, {
            onDelete: 'cascade'
        });
    };

    User.associate = function (models){
        User.hasMany(models.Post, {
            onDelete: 'cascade'
        });
    };

return User;
};