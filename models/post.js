
module.exports = function(sequelize, DataTypes) {
    //Table for a User's posts.
    var Post = sequelize.define("Post", {
      user: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Post.associate = function(models) {
      Post.belongsTo(models.User, {

      });
    };
  
    return Post;
  };
  