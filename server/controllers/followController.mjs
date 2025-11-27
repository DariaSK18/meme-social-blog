import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import User from "../models/user.mjs";
import Follow from "../models/follow.mjs";

export const toggleFollow = catchAsync(async (req, res, next) => {
  const currentUserId = req.params.id
  const targetUserId = req.user.id;

  const post = await Meme.findByPk(postId);
  if (!post) return next(new AppError("Post not found", 404));

  const existingLike = await Like.findOne({where: {user_id: userId, meme_id: postId}})

  let liked

  if(existingLike) {
    await existingLike.destroy()
    liked = false
  }else{
    await Like.create({
        user_id: userId,
        meme_id: postId
    })
    liked = true
  }

  const likeCount = await Like.count({
    where: {meme_id: postId}
  })

  res.status(200).json({
    likes: likeCount,
    liked: liked,
  });
});