import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.mjs";
import AppError from "./utils/AppError.mjs";

dotenv.config()

const app = express()

app.use(express.json());

// app.get('/', (req, res) => {
//     console.log(req.originalUrl);
// })


app.use((req, res, next) => {
    console.log(req.originalUrl, req.method)
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorHandler);

export default app;