import { Router } from "express";
import userRoutes from "./userRoutes.mjs";
import postRoutes from "./postRoutes.mjs";

const router = Router()

router.use('/user', userRoutes)
router.use('/post', postRoutes)

export default router