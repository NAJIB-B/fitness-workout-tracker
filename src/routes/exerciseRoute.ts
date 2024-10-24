import { Router } from "express";

import {
  getAllExercise,
  createAnExercise,
  getAnExercise,
  updateAnExercise,
  deleteAnExercise,
} from "../controllers/exerciseController.ts";

const router = Router();

router.route("/").get(getAllExercise).post(createAnExercise);

router
  .route("/:exerciseId")
  .get(getAnExercise)
  .patch(updateAnExercise)
  .delete(deleteAnExercise);

export default router;
