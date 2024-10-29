import {Router} from "express"

import {protect, authorizeWorkoutHistory} from "../controllers/authContoller.ts"
import {getAllHistory, getAnHistory} from "../controllers/workoutHistoryController.ts"

const router = Router()

router.use(protect)

router.get("/", getAllHistory)

router.get("/:workoutHistoryId", authorizeWorkoutHistory, getAnHistory)


export default router
