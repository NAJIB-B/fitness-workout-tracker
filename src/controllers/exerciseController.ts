import {schema} from "../models/exerciseModel.ts"

import Exercise from "../models/exerciseModel.ts";
import catchAsync from "../utils/catchAsync.ts";
import AppError from "../utils/appError.ts";


export const getAllExercise = catchAsync(async(req, res, next) => {

  const exercises = await Exercise.find({
    $or : [
      {owner: null},
      {owner: req?.userId}
    ]
  })
  res.status(200).json({
    message: 'success',
    result: exercises.length,
    exercises
  })
})

export const createAnExercise = catchAsync(async(req, res, next) => {

  const {error, value} = schema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 400))
  }

  const exercise = await Exercise.create(req.body)

  res.status(201).json({
    message: 'success',
    exercise
  })

})

export const getAnExercise = catchAsync(async(req, res, next) => {

  const exerciseId = req.params.exerciseId

  const exercise = await Exercise.findById(exerciseId)

  if (!exercise) {
    return next(new AppError('No exercise found with that Id', 404))
  }

  res.status(200).json({
    message: 'success',
    exercise
  })

})

export const updateAnExercise = catchAsync(async(req, res, next) => {

  const exerciseId = req.params.exerciseId

  const exercise = await Exercise.findByIdAndUpdate(exerciseId, req.body, {new: true})

  if (!exercise) {
    return next(new AppError('No exercise found with that Id', 404))
  }

  res.status(201).json({
    message: 'success',
    exercise
  })

})

export const deleteAnExercise = catchAsync(async(req, res, next) => {

  const exerciseId = req.params.exerciseId

  const exercise = await Exercise.findByIdAndDelete(exerciseId)

  if (!exercise) {
    return next(new AppError('No exercise found with that Id', 404))
  }

  res.status(204).json({
    message: 'success',
  })

})


