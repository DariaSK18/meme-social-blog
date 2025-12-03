import AppError from "../utils/AppError.mjs";
import Meme from "../models/meme.mjs";

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  if (req.originalUrl.startsWith("/api"))
    return next(new AppError("Not authenticated", 401));
  return res.redirect("/login");
};

export const isUser = (req, res, next) => {
  res.locals.user = req.user || null;
  next();
};

export const isAuthor = async (req, res, next) => {
  const {
    params: { id },
    user,
  } = req;
  if (!user.id) return next(new AppError("Not authenticated", 401));

  const post = await Meme.findByPk(id);
  if (!post) return next(new AppError("Post not found", 404));
  if (post.user_id.toString() !== user.id.toString())
    return next(new AppError("Not the author of the post", 403));
  next();
};
