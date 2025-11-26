import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import User from "../models/user.mjs";


const users = ["Daria", "Burcu", "Anna", "Steven"];

// --- get all users (for checks or admin user only) ---
export const getAllUsers = catchAsync(async (req, res, next) => {
  res.status(200).json(users);
});

// --- register user ---
export const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next(new AppError("All fields required", 400));
  const saved = await User.create({ username, email, password });
  res.status(201).json(saved);
});


