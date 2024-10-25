import { Router } from "express";

import {
  getAllExercise,
  createAnExercise,
  getAnExercise,
  updateAnExercise,
  deleteAnExercise,
} from "../controllers/exerciseController.ts";

import {protect} from "../controllers/authContoller.ts"

const router = Router();

router.use(protect)

router.route("/").get(getAllExercise).post(createAnExercise);

router
  .route("/:exerciseId")
  .get(getAnExercise)
  .patch(updateAnExercise)
  .delete(deleteAnExercise);

export default router;
