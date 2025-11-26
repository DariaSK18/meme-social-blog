import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import User from "../models/user.mjs";


const users = ["Daria", "Burcu", "Anna", "Steven"];

// --- get all users (for checks or admin user only) ---
export const getAllUsers = catchAsync(async (req, res, next) => {
  res.status(200).json(users);
});

// --- get single user by id ---

// --- update user by id ---

// --- delete user profile ---


