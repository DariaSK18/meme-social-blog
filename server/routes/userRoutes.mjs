import { Router } from "express";
import * as userController from "../controllers/userController.mjs";
import * as authController from "../controllers/authController.mjs";
import authToken from "../middleware/authToken.mjs";
// import { isUser, isAuthor } from "../middleware/isUser.mjs";

const router = Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(authController.createUser);

router.route("/:id").get(userController.getOneUser);

router
  .route("/me")
  .patch(authToken, userController.updateUser)
  .delete(authToken, userController.deleteUser);

router.route("/login").post(authController.loginUser);

router.route("/refresh-token").post(authController.refreshToken);

router.route("/logout").post(authController.logoutUser);

export default router;
