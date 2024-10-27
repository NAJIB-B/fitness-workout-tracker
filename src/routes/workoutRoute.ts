import {Router} from "express"

import {createWorkout, getAWorkout} from "../controllers/workoutController.ts"
import { protect, authorizeWorkout } from "../controllers/authContoller.ts"

const router = Router()

router.use(protect)

router.route("/").get().post(createWorkout)

router.route("/:workoutId").get(authorizeWorkout, getAWorkout)


export default router
