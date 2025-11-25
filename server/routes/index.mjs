import { Router } from "express";
import userRoutes from "./userRoutes.mjs";

const router = Router()

router.use('/user', userRoutes)

export default router