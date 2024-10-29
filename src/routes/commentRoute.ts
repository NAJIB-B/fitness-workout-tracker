import {Router} from "express"

import {createAComment} from "../controllers/commentController.ts"
import {protect} from "../controllers/authContoller.ts"

const router = Router()

router.use(protect)

router.route("/").post(createAComment)



export default router
