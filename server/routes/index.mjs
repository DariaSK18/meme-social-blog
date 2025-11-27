import { Router } from "express";
import userRoutes from "./userRoutes.mjs";
import postRoutes from "./postRoutes.mjs";
import followRoutes from "./followRoutes.mjs";
import commentRoutes from "./commentRoutes.mjs";

const router = Router()

router.use('/user', userRoutes)
router.use('/post', postRoutes)
router.use('/follow', followRoutes)
router.use('/comment', commentRoutes)

export default router