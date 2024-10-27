import { Router } from "express";

import {
  getAllExercise,
  createAnExercise,
  getAnExercise,
  updateAnExercise,
  deleteAnExercise,
} from "../controllers/exerciseController.ts";

import {protect, authorizeExercise} from "../controllers/authContoller.ts"

const router = Router();

router.use(protect)

router.route("/").get(getAllExercise).post(createAnExercise);

router
  .route("/:exerciseId")
  .get(authorizeExercise, getAnExercise)
  .patch(authorizeExercise, updateAnExercise)
  .delete(authorizeExercise, deleteAnExercise);

export default router;
