import { Router } from 'express'
import * as userController from '../controllers/userController.mjs'

const router = Router()

router
 .route('/')
 .get(userController.getAllUsers)
 .post(userController.createUser)

router.route("/:id").get(userController.getOneUser);

router
  .route("/me")
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

router
  .route("/auth")
  .post(userController.loginUser)

router.route("/logout").post(userController.logoutUser)

 export default router;