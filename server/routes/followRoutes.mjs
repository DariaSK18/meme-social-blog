import { Router } from 'express'
import * as followController from '../controllers/followController.mjs'
import authToken from "../middleware/authToken.mjs";

const router = Router()

router
  .route("/:id")
  .patch(authToken, followController.toggleFollow) // ok

router.get("/:id/followers", followController.getFollowers) // ok

router.get("/:id/following", followController.getFollowing) // ok

export default router