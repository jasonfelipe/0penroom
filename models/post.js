
module.exports = function(sequelize, DataTypes) {
    //Table for a User's posts.
    var Post = sequelize.define("Post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,140]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 3000]
        }
      }
    });
  
    Post.associate = function(models) {
      Post.belongsTo(models.User, {

      });
    };
  
    return Post;
  };
  