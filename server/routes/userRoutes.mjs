import { Router } from 'express'
import * as userController from '../controllers/userController.mjs'
import * as authController from "../controllers/authController.mjs";

const router = Router()

router
 .route('/')
 .get(userController.getAllUsers)
 .post(authController.createUser)

// router.route("/:id").get(userController.getOneUser);

// router
//   .route("/me")
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser)

router
  .route("/auth")
  .post(authController.loginUser)

router.route("/logout").post(authController.logoutUser)

 export default router;