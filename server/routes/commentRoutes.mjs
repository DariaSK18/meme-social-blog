import { Router } from 'express'
import * as commentController from '../controllers/commentController.mjs'
import authToken from "../middleware/authToken.mjs";

const router = Router()

router
  .route("/:id")
  .get(commentController.getComments)
  .post(authToken, commentController.createComment)
  .delete(authToken, commentController.deleteComment)

export default router