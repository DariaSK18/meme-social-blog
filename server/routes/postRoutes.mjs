import { Router } from 'express'
import * as postController from '../controllers/postController.mjs'

const router = Router()

router
  .route("/")
  .get(postController.getAllBlogs)

export default router