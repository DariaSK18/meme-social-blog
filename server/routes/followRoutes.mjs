import { Router } from 'express'
import * as followController from '../controllers/followController.mjs'
import { isAuth } from "../middleware/isUser.mjs";

const router = Router()

router
  .route("/:id")
  .patch(isAuth, followController.toggleFollow) // ok

router.get("/:id/followers", followController.getFollowers) // ok

router.get("/:id/following", followController.getFollowing) // ok

export default router