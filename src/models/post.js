'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'usuario',
        onDelete: 'CASCADE'
      });
      Post.hasMany(models.Post_Images, {
        foreignKey: 'postId',
        as: 'imagenes',
        onDelete: 'CASCADE'
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comentarios',
        onDelete: 'CASCADE'
      });
      Post.belongsToMany(models.Tag, {
        through: models.PostTag,
        foreignKey: 'postId',
        otherKey: 'tagId',
        as: 'tags'
      });
    }
  }
  Post.init({
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};