import { Router } from 'express'
import * as commentController from '../controllers/commentController.mjs'
import { isAuth } from "../middleware/isUser.mjs";

const router = Router()

router
  .route("/:id")
  .get(commentController.getComments) // ok
  .post(isAuth, commentController.createComment) // ok
  .delete(isAuth, commentController.deleteComment) // ok

export default router