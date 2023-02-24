      const { Model, DataTypes } = require('sequelize');
      const sequelize = require('../config/connection');
      
      class Comment extends Model {}
      
      Comment.init(
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          comment: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          article_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'article',
                key: 'id',
          },
        },
          date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
          },
        },
        {
          sequelize,
          timestamps: false,
          // createdAt and/or updatedAt?
          freezeTableName: true,
          underscored: true,
          modelName: 'comment',
        }
      );
      
      module.exports = Comment;
      