import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import Meme from "../models/meme.mjs";
import Tag from "../models/tag.mjs";
import MemeTag from "../models/memeTag.mjs";

// --- get all posts ---
export const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Meme.findAll({
  include: {
    model: Tag,
    through: { attributes: [] },
  },
});
  res.status(200).json(posts);
});

// --- create a post ---

export const createPost = catchAsync(async (req, res, next) => {
  const {
    user,
    body: { title, description, category, image_url, tags },
  } = req;
  if (!title || !description)
    return next(new AppError("Title and description are required", 400));

  const post = await Meme.create({
    title,
    description,
    category,
    image_url,
    user_id: user.id,
  });

  if (tags && Array.isArray(tags) && tags.length) {
    for (let tagName of tags) {
      const [tag] = await Tag.findOrCreate({
        where: { tag_name: tagName },
      });

      await MemeTag.findOrCreate({
        where: {
          meme_id: post.id,
          tag_id: tag.id,
        },
      });
    }
  }
  res.status(201).json(post);
});

// --- get one post by id ---

export const getOnePost = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const post = await Meme.findByPk(id, {
    include: {
      model: Tag,
      through: { attributes: [] },
    },
  });
  if (!post) return next(new AppError("Post not found", 404));
  res.status(200).json(post);
});

// --- update a field ---

export const updatePost = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    body: { title, description, category, image_url, tags },
    user
  } = req;

  const post = await Meme.findByPk(id);
  if (!post) return next(new AppError("Post not found", 404));
  if (post.user_id !== user.id)
    return next(new AppError("Not the author", 403));

  if (title) post.title = title;
  if (description) post.description = description;
  if (category) post.category = category;
  if (image_url) post.image_url = image_url;

  if (tags && Array.isArray(tags)) {
    await MemeTag.destroy({ where: { meme_id: post.id } });

    for (const tagName of tags) {
      const [tag] = await Tag.findOrCreate({
        where: { tag_name: tagName },
      });
      await MemeTag.findOrCreate({
        where: { meme_id: post.id, tag_id: tag.id },
      });
    }
  }

  const updated = await post.save();
  res.status(200).json(updated);
});

// --- delete post by id ---

export const deletePost = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    user,
  } = req;

  const post = await Meme.findByPk(id);
  if (!post) return next(new AppError("Post not found", 404));

  if (post.user_id !== user.id)
    return next(new AppError("Not the author", 403));

  await MemeTag.destroy({ where: { meme_id: id } });
  await post.destroy();

  res.status(200).json({ msg: "Post deleted successfully" });
});

// --- toggle like for post ---
