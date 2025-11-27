import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import User from "../models/user.mjs";
import Follow from "../models/follow.mjs";

// --- toggle follow or unfollow user ---
export const toggleFollow = catchAsync(async (req, res, next) => {
  const targetUserId = req.params.id
  const currentUserId = req.user.id;

  if(currentUserId.toString() === targetUserId.toString()) return next(new AppError("You can not follow yourself", 400))

  const existing = await Follow.findOne({where: {follower_id: currentUserId, following_id: targetUserId}})

  let following

  if(existing) {
    await existing.destroy()
    following = false
  }else{
    await Follow.create({
        follower_id: currentUserId,
        following_id: targetUserId
    })
    following = true
  }

  const followersCount = await Follow.count({
    where: {following_id: targetUserId}
  })
  const followingCount = await Follow.count({
    where: {follower_id: currentUserId}
  })

  res.status(200).json({
    following,
    followersCount,
    followingCount
  });
});