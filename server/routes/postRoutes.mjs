import { Router } from 'express'
import * as postController from '../controllers/postController.mjs'
import authToken from "../middleware/authToken.mjs";
import { isAuthor } from "../middleware/isUser.mjs";

const router = Router()

router
  .route("/")
  .get(postController.getAllBlogs)
  .post(authToken, postController.createPost);

router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(authToken, isAuthor, postController.updatePost)
  .delete(authToken, isAuthor, postController.deletePost);

router
  .route("/:id/like")
  .patch(authToken, postController.toggleLike)

export default router