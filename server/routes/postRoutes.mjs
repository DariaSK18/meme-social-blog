import { Router } from "express";
import * as postController from "../controllers/postController.mjs";
import { validate } from "../middleware/validate.mjs";
import { postPatch, postValidation } from "../utils/helpers/validation.mjs";
import { checkSchema } from "express-validator";
import { isUser, isAuth, isAuthor } from "../middleware/isUser.mjs";


const router = Router();

router
  .route("/")
  .get(postController.getAllPosts) // ok
  .post(isAuth, 
    checkSchema(postValidation),
    validate,
    postController.createPost
  ); // ok  (tags dont get added)

router
  .route("/:id")
  .get(postController.getOnePost) // ok
  .patch(isAuth, isAuthor,  checkSchema(postPatch), validate, postController.updatePost) // ok (tags dont get updated)
  .delete(isAuth, isAuthor,  postController.deletePost); // ok

router.route("/:id/like").patch(isAuth,  postController.toggleLike); // ok

export default router;
