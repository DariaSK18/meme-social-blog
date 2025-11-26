import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // console.log("decoded access:", user);
    req.user = user;
    next();
  });
}