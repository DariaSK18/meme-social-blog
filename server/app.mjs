import express from "express";
import dotenv from "dotenv";

dotenv.config()

const app = express()


app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

export default app;