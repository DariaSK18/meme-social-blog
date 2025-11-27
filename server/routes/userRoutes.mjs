import { Router } from "express";
import * as userController from "../controllers/userController.mjs";
import * as authController from "../controllers/authController.mjs";
import authToken from "../middleware/authToken.mjs";
// import { isUser, isAuthor } from "../middleware/isUser.mjs";

const router = Router();

router
  .route("/")
  .get(userController.getAllUsers) // ok
  .post(authController.createUser); // ok

router.route("/:id").get(userController.getOneUser); // ok

router
  .route("/me")
  .patch(authToken, userController.updateUser) // ok
  .delete(authToken, userController.deleteUser); // ok

router.route("/login").post(authController.loginUser); // ok

router.route("/refresh-token").post(authController.refreshToken);

router.route("/logout").post(authController.logoutUser); // ok

export default router;
