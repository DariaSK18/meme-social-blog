import { Router } from 'express'
import * as commentController from '../controllers/commentController.mjs'
import authToken from "../middleware/authToken.mjs";

const router = Router()

router
  .route("/:id")
  .get(commentController.getComments) // ok
  .post(authToken, commentController.createComment) // ok
  .delete(authToken, commentController.deleteComment) // ok

export default router