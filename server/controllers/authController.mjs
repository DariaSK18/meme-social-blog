import User from "../models/user.mjs";
import RefreshToken from "../models/refreshToken.mjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/helpers/tokenService.mjs";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.mjs";
import { compareHashedPassword } from "../utils/helpers/hashPassword.mjs";

// --- login user ---

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).json({ msg: "User not found" });

  const isValidPassword = compareHashedPassword(password, user.password);

  if (!isValidPassword) return res.status(401).json({ msg: "Wrong password" });

  const accessToken = generateAccessToken({
    id: user.id,
    username: user.username,
  });
  const refreshToken = generateRefreshToken({
    id: user.id,
    username: user.username,
  });

  await RefreshToken.create({ token: refreshToken, user_id: user.id });

  res.json({ accessToken, refreshToken });
});

// --- register user ---
export const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next(new AppError("All fields required", 400));
  const saved = await User.create({ username, email, password });
  res.status(201).json(saved);
});

// --- refresh token ---

// --- logout user ---
