import { Router } from "express";
import userRoutes from "./userRoutes.mjs";
import postRoutes from "./postRoutes.mjs";
import followRoutes from "./followRoutes.mjs";

const router = Router()

router.use('/user', userRoutes)
router.use('/post', postRoutes)
router.use('/follow', followRoutes)

export default router