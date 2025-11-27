import { Router } from "express";
import * as postController from "../controllers/postController.mjs";
import authToken from "../middleware/authToken.mjs";
import { isAuthor } from "../middleware/isUser.mjs";
import { validate } from "../middleware/validate.mjs";
import { postPatch, postValidation } from "../utils/helpers/validation.mjs";
import { checkSchema } from "express-validator";

const router = Router();

router
  .route("/")
  .get(postController.getAllPosts) // ok
  .post(
    authToken,
    checkSchema(postValidation),
    validate,
    postController.createPost
  ); // ok  (tags dont get added)

router
  .route("/:id")
  .get(postController.getOnePost) // ok
  .patch(authToken, isAuthor, checkSchema(postPatch), validate, postController.updatePost) // ok (tags dont get updated)
  .delete(authToken, isAuthor, postController.deletePost); // ok

router.route("/:id/like").patch(authToken, postController.toggleLike); // ok

export default router;
