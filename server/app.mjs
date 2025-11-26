import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.mjs";
import AppError from "./utils/AppError.mjs";
import routes from "./routes/index.mjs";

// --- test


dotenv.config();

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     console.log(req.originalUrl);
// })

// ---- testing
const posts = [
  {
    username: "Daria",
    title: "Post 1",
  },
  {
    username: "Burcu",
    title: "Post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    console.log("decoded refresh:", user);
    const accessToken = jwt.sign(
      { name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({ accessToken });
  });
});

app.delete('/logout', (req, res) =>{ 
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post("/login", (req, res) => {
  const {
    body: { username },
  } = req;

  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("decoded access:", user);
    req.user = user;
    next();
  });
}

// --------------------

app.use("/api", routes);

app.use((req, res, next) => {
  console.log(req.originalUrl, req.method);
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

export default app;
