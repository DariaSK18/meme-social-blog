import sequelize from "../config/connection.mjs";
import { Meme, User, Comment, Like, Tag, MemeTag, Follow } from "../models/index.mjs";
import RefreshToken from "../models/refreshToken.mjs";
import { hashPassword } from "../utils/helpers/hashPassword.mjs";



import tagsData from "./tags.json" with { type: "json" };
import userData from "./users.json" with { type: "json" };
import memeData from "./memes.json" with { type: "json" };
import MemeTagData from "./memeTags.json" with { type: "json" };
import commentData from "./comments.json" with { type: "json" };
import likeData from "./likes.json" with { type: "json" };
import followData from "./follows.json" with { type: "json" };


const hashUserPasswords = () => {
  for (const user of userData) {
    user.password =hashPassword(user.password);
  }
};

const seedDatabase = async () => {
  hashUserPasswords();
  await sequelize.sync({ force: true });
  const tags = await Tag.bulkCreate(tagsData);
  const users = await User.bulkCreate(userData);
  const memes = await Meme.bulkCreate(memeData);
  const memeTags = await MemeTag.bulkCreate(MemeTagData);
  const comments = await Comment.bulkCreate(commentData);
  const likes = await Like.bulkCreate(likeData);
  const follows = await Follow.bulkCreate(followData);

  process.exit(0);
};

seedDatabase();
