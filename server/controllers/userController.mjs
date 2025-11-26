import { catchAsync } from "../utils/catchAsync.mjs";
// import AppError from "../utils/AppError.mjs";
// import User from "../models/user.mjs";
import User from "../models/user.mjs";

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

// --- delete user profile ---
