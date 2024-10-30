import {Router} from "express"

import {generateReport} from "../controllers/reportController.ts"
import {protect} from "../controllers/authContoller.ts"

const router = Router()

router.use(protect)

router.route("/").get(generateReport)


export default router
