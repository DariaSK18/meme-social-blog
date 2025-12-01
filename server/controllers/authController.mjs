import User from "../models/user.mjs";
import RefreshToken from "../models/refreshToken.mjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/helpers/tokenService.mjs";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.mjs";
import { compareHashedPassword } from "../utils/helpers/hashPassword.mjs";
import AppError from "../utils/AppError.mjs";
import { sendResponse } from "../utils/helpers/sendResponse.mjs";

// --- login user ---

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return next(new AppError("User not found", 401));

  const isValidPassword = compareHashedPassword(password, user.password);
  if (!isValidPassword) return next(new AppError("Wrong password", 401));

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  await RefreshToken.create({ token: refreshToken, user_id: user.id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, 200, { accessToken, refreshToken })
});

// --- register user ---
export const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next(new AppError("All fields required", 400));

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return next(new AppError("Email already in use", 400));

  const saved = await User.create({ username, email, password });
  sendResponse(res, 201, saved)
});

// --- refresh token ---

export const refreshToken = catchAsync(async (req, res, next) => {
  const oldToken = req.cookies.refreshToken;
  if (!oldToken) return next(new AppError("No refresh token", 401));

  const dbToken = await RefreshToken.findOne({ where: { token: oldToken } });
  if (!dbToken) return next(new AppError("Refresh token invalid", 403)); 

  jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return next(new AppError("Invalid refresh token", 403));

    const dbUser = await User.findByPk(user.id);
    if (!dbUser) return next(new AppError("Refresh token invalid", 403)); 
    // console.log("decoded refresh:", user);
    await RefreshToken.destroy({ where: { token: oldToken } });
    const newRefreshToken = generateRefreshToken({ id: dbUser.id });

    await RefreshToken.create({
      token: newRefreshToken,
      user_id: dbUser.id,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    const accessToken = generateAccessToken({ id: dbUser.id });
    sendResponse(res, 200, { accessToken, refreshToken: newRefreshToken })
  });
});

// --- logout user ---

export const logoutUser = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return next(new AppError("Bad request", 400)); 

  const deletedToken = await RefreshToken.destroy({ where: { token } });
  if (!deletedToken) return next(new AppError("Not found", 404)); 
  res.clearCookie("refreshToken");
  sendResponse(res, 200, null, "Logged out")
});
