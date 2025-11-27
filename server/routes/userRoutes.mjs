import { Router } from "express";
import * as userController from "../controllers/userController.mjs";
import * as authController from "../controllers/authController.mjs";
import authToken from "../middleware/authToken.mjs";
import { validate } from "../middleware/validate.mjs";
import {
  userPatch,
  signupValidation,
  userLogin,
} from "../utils/helpers/validation.mjs";
import { checkSchema } from "express-validator";

const router = Router();

router
  .route("/")
  .get(userController.getAllUsers) // ok
  .post(checkSchema(signupValidation), validate, authController.createUser); // ok

router.route("/:id").get(userController.getOneUser); // ok

router
  .route("/me")
  .patch(authToken, checkSchema(userPatch), validate, userController.updateUser) // ok
  .delete(authToken, userController.deleteUser); // ok

router.route("/login").post(checkSchema(userLogin), validate,  authController.loginUser); // ok

router.route("/refresh-token").post(authController.refreshToken);

router.route("/logout").post(authController.logoutUser); // ok

export default router;
