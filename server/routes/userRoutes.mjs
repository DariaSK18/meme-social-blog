import { Router } from 'express'
import * as userController from '../controllers/userController.mjs'

const router = Router()

router
 .route('/')
 .get(userController.getAllUsers)
 .post(userController.createUser)

 export default router;