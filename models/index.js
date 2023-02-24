const User = require('./User');
const Content = require('./Content');
const Comment = require('./Comment')

User.hasMany(Content, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Content.belongsTo(User, {
  foreignKey: 'user_id'
});

Content.hasMany(Comment, {
  foreignKey: 'content_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Content, {
  foreignKey: 'content_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});



module.exports = { User, Content, Comment };
