import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import { Meme } from "../models/meme.mjs";
import { Tag } from "../models/tag.mjs";

// --- get all blogs ---
export const getAllBlogs = catchAsync(async (req, res, next) => {
    const blogs = await Meme.findAll()
    res.status(200).json(blogs)
})

// --- create a blog ---

// --- get one blog by id ---

// --- update a field ---

// --- delete blog by id ---
