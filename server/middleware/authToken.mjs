import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.mjs";

export default (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  // || req.cookies.refreshToken;

  if (!token) return next(new AppError("Not authenticated", 401));

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded)
    return next(new AppError("Invalid token or expired token", 403));
  // console.log("decoded access:", user);
  req.user = decoded;
  next();
};
