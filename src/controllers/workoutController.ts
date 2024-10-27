import { Schema } from "mongoose";
import {schema} from "../models/workoutModel.ts"
import { Status } from "../models/workoutModel.ts";

import Workout, {IWorkout} from "../models/workoutModel.ts";
import catchAsync from "../utils/catchAsync.ts";
import AppError from "../utils/appError.ts";


const getWorkoutStatus = (Workout: IWorkout) => {

}

const getPopulatedWorkout = async(workoutId: string) => {
  return await Workout.findById(workoutId).populate("exercises.exercise", "name").populate("owner", "name")
}

export const createWorkout = catchAsync(async(req, res, next) => {

  const {error, value} = schema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 400))
  }
  
  const workout = await Workout.create(req.body)

  const populatedWorkout = await getPopulatedWorkout(workout._id.toString())

  res.status(201).json({
    message: 'success',
    workout: populatedWorkout
  })
})

export const getAWorkout = catchAsync(async(req, res, next) => {
  const workoutId = req.params?.workoutId

  const workout = await Workout.findById(workoutId)

  if (workout) {

  workout.status = Status.completed
  }

  res.status(200).json({
    message: 'success',
    workout
  })
})

