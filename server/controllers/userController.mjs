import { catchAsync } from "../utils/catchAsync.mjs";
// import AppError from "../utils/AppError.mjs";
// import User from "../models/user.mjs";
import User from "../models/user.mjs";
import AppError from "../utils/AppError.mjs";
import RefreshToken from "../models/refreshToken.mjs";
import Meme from "../models/meme.mjs";

// const users = ["Daria", "Burcu", "Anna", "Steven"];

// --- get all users (for checks or admin user only) ---
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  console.log(users);

  res.status(200).json(users);
});

// --- get single user by id ---

export const getOneUser = catchAsync(async (req, res, next) => {
  const {
    body: { id },
  } = req;
  const user = await User.findOne({ where: id });
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json(user);
});

// --- update user by id ---

export const updateUser = catchAsync(async (req, res, next) => {
  const {
    user: {id},
    body: { username, password, currentPsw },
  } = req;

  const user = await User.findByPk(id);
  if (!user) return next(new AppError("User not found", 404));
  if (currentPsw) {
    const isMatch = compareHashedPassword(currentPsw, user.password);
    if (!isMatch) return next(new AppError("Current password incorrect", 400));
  }

  if (username) user.username = username;
  if (password) user.password = hashPassword(password);

  // const updated = await User.findByIdAndUpdate(id, user, {new: true});
  const updated = await user.save();
  if (!updated) return next(new AppError("User not found", 404));
  res.status(200).json(updated);
});


// --- delete user profile ---

export const deleteUser = catchAsync(async (req, res, next) => {
  const {
    body: { id },
  } = req;
  // delete all his post if user delete profile (implement when the posts done)
  // or change name 'Meme' to 'Post' ???
  await Meme.destroy({ where: { user_id: id } });

  const deleted = await User.destroy({ where: { id } });
  if (!deleted) return next(new AppError("User not found", 404));
  await RefreshToken.destroy({ where: { user_id: id } });
  res.clearCookie("refreshToken");
  res.status(200).json({ msg: "Account deleted successfully" });
});
