import Meme from "./meme.mjs";
import User from "./user.mjs";
import Comment from "./comment.mjs";
import Like from "./like.mjs";
import Tag from "./tag.mjs";
import MemeTag from "./memeTag.mjs";
import Follow from "./follow.mjs";




Meme.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Meme, {
  foreignKey: "user_id",
  as: "memes",
});

Meme.hasMany(Comment, {
  foreignKey: "meme_id",
  as: "comments",
});

Comment.belongsTo(Meme, {
  foreignKey: "meme_id",
  as: "meme",
});


User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Like, {
  foreignKey: "user_id",
  as: "likes",
});

Meme.hasMany(Like, {
  foreignKey: "meme_id",
  as: "likes",
});

Like.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Like.belongsTo(Meme, {
  foreignKey: "meme_id",
  as: "meme",
});

Meme.belongsToMany(Tag, {
  through: MemeTag,
  foreignKey: "meme_id",
  otherKey: 'tag_id',
  as: "tags",
});

Tag.belongsToMany(Meme, {
  through: MemeTag,
  foreignKey: "tag_id",
  otherKey: 'meme_id',
  as: "memes",
});

// MemeTag.belongsTo(Meme, {
//   foreignKey: "meme_id",
//   as: "meme",
// });

// MemeTag.belongsTo(Tag, {
//   foreignKey: "tag_id",
//   as: "tag",
// });

Follow.belongsTo(User, {
  foreignKey: "follower_id",
  as: "follower",
});

Follow.belongsTo(User, {
  foreignKey: "following_id",
  as: "following",
});

User.hasMany(Follow, {
  foreignKey: "follower_id",
  as: "following",
});

User.hasMany(Follow, {
  foreignKey: "following_id",
  as: "followers",
});

export {
  Meme,
  User,
  Comment,
  Like,
  Tag,
  Follow,
  MemeTag,
};
