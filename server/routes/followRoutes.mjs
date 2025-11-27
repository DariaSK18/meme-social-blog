import { Router } from 'express'
import * as followController from '../controllers/followController.mjs'
import authToken from "../middleware/authToken.mjs";

const router = Router()

router
  .route("/:id")
  .patch(authToken, followController.toggleFollow)

router.get("/:id/followers", followController.getFollowers)

router.get("/:id/following", followController.getFollowing)

export default router