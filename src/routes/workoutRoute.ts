import { Router } from "express";

import {
  createWorkout,
  getAllWorkout,
  getAWorkout,
  updateAWorkout,
  deleteAWorkout,
  completeAWorkout
} from "../controllers/workoutController.ts";

import { protect, authorizeWorkout } from "../controllers/authContoller.ts";

const router = Router();

router.use(protect);

router.route("/").get(getAllWorkout).post(createWorkout);

router
  .route("/:workoutId")
  .get(authorizeWorkout, getAWorkout)
  .patch(authorizeWorkout, updateAWorkout)
  .delete(authorizeWorkout, deleteAWorkout);


router.post("/completeAWorkout/:workoutId", authorizeWorkout, completeAWorkout)

export default router;
