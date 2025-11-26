import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {id: user.id, username: user.username},
        process.env.REFRESH_TOKEN_SECRET
    )
}
