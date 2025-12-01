import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import Meme from "../models/meme.mjs";
import Comment from "../models/comment.mjs";
import User from "../models/user.mjs";
import { sendResponse } from "../utils/helpers/sendResponse.mjs";

// --- get post comments ---
export const getComments = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;

  const comments = await Comment.findAll({
    where: { meme_id: id },
    include: {
      model: User,
      as: "user",
      attributes: ["id", "username"],
    },
    order: [["createdAt", "DESC"]],
  });
  sendResponse(res, 200, comments);
});

// --- create and post comment ---
export const createComment = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    body: { text },
  } = req;

  if (!text) return next(new AppError("Text required", 400));

  const post = await Meme.findByPk(id);
  if (!post) return next(new AppError("Post not found", 404));

  const comment = await Comment.create({
    text,
    meme_id: id,
    user_id: req.user.id,
  });
  sendResponse(res, 201, comment);
});

// --- delete your comment ---
export const deleteComment = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const userId = req.user.id;

  const comment = await Comment.findByPk(id);
  if (!comment) return next(new AppError("Comment not found", 404));

  if (comment.user_id !== userId) return next(new AppError("Not allowed", 403));

  await comment.destroy();
  sendResponse(res, 200, { msg: "Comment deleted" });
});
