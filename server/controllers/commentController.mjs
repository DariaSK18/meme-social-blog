import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import Meme from "../models/meme.mjs";
import Comment from "../models/comment.mjs";

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
});

// --- create and post comment ---
export const createComment = catchAsync(async (req, res, next) => {});

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
  res.status(200).json({ msg: "Comment deleted" });
});
