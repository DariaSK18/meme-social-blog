import User from "../models/user.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";
import { compareHashedPassword } from "../utils/helpers/hashPassword.mjs";
import AppError from "../utils/AppError.mjs";
import { sendResponse } from "../utils/helpers/sendResponse.mjs";
import passport from 'passport';

// --- login user ---
export const loginUser = (req, res, next) => {
  const { email, password } = req.validatedData;
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) return sendResponse(res, 401, { msg: "Invalid credentials" })
    
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log("sessionID:", req.sessionID);
      return sendResponse(res, 200, {
        msg: "Successfully logged in",
        user: { id: user.id, username: user.username, email: user.email },
      })
    });
  })(req, res, next);
};

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

// --- logout user ---

export const logoutUser = catchAsync(async (req, res, next) => {
   req.logout((err) => {
    if (err) return next(new AppError("Logout failed", 400));
    req.session.destroy(() => {
    res.clearCookie('connect.sid');
    sendResponse(res, 200, null, "Logged out");
  });
  });
});
