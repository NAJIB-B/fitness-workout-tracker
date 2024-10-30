import { Schema } from "mongoose";
import { schema, Status } from "../models/workoutModel.ts";
import {schema as workoutHistorySchema}  from "../models/workoutHistoryModel.ts"
import WorkoutHistory from "../models/workoutHistoryModel.ts";

import Workout, { IWorkout } from "../models/workoutModel.ts";
import catchAsync from "../utils/catchAsync.ts";
import AppError from "../utils/appError.ts";

const getWorkoutStatus = (Workout: IWorkout) => {
  if (Workout.status === Status.completed) {
    return Status.completed;
  }
  const currentDate = new Date();
  const scheduledDate = Workout.scheduledDate;
  if (scheduledDate > currentDate) {
    return Status.pending;
  } else if (scheduledDate.getDate() === currentDate.getDate()) {
    return Status.active;
  } else if (scheduledDate < currentDate) {
    return Status.missed;
  }
};

const getPopulatedWorkout = async (workoutId: string) => {
  return await Workout.findById(workoutId)
    .populate("exercises.exercise", "name")
    .populate("owner", "name");
};

export const createWorkout = catchAsync(async (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(new AppError(error.message, 400));
  }

  const workout = await Workout.create(req.body);

  const populatedWorkout = await getPopulatedWorkout(workout._id.toString());

  res.status(201).json({
    message: "success",
    workout: populatedWorkout,
  });
});

export const getAllWorkout = catchAsync(async (req, res, next) => {

  const workouts = await Workout.find({owner : req?.userId}).sort({scheduledDate: -1});

  workouts.map((workout) => {
    workout.status = getWorkoutStatus(workout)
  })

  

  res.status(200).json({
    message: "success",
    result: workouts.length,
    workouts,
  });
});

export const getAWorkout = catchAsync(async (req, res, next) => {
  const workoutId = req.params?.workoutId;

  const workout = await getPopulatedWorkout(workoutId);

  if (workout) {
    workout.status = getWorkoutStatus(workout)
  }

  res.status(200).json({
    message: "success",
    workout,
  });
});

export const updateAWorkout = catchAsync(async (req, res, next) => {
  const workoutId = req.params?.workoutId;

  const workout = await Workout.findByIdAndUpdate(workoutId, req.body, {new: true});


  res.status(201).json({
    message: "success",
    workout,
  });
});

export const deleteAWorkout = catchAsync(async (req, res, next) => {
  const workoutId = req.params?.workoutId;

  const workout = await Workout.findByIdAndDelete(workoutId);


  res.status(204).json({
    message: "success",
  });
});

export const completeAWorkout = catchAsync(async (req, res, next) => {
  const workoutId = req.params?.workoutId;


  const workout = await Workout.findById(workoutId);
  if (!workout) {
    return next(new AppError('No workout found with that Id', 404))
  }
  //add the completed workout to history
  const data = {
    workout: workoutId,
    owner: req.userId,
  }

  const {error, value} = workoutHistorySchema.validate(data)

  if (error) {
    return next(new AppError(error.message, 401))
  }

  const history = await WorkoutHistory.create(data)


  if (workout?.isReoccuring) {
    //Add a week to the scheduled date
    const oneWeek = 7 * 24 * 60 * 60 * 1000
    const newDate = new Date().getTime() + oneWeek

    const newDateInDateFormat = new Date(newDate)
    workout.scheduledDate = newDateInDateFormat
  } else {
    workout.status = Status.completed
  }

  await workout.save()


  res.status(200).json({
    message: "success",
    history,
  });
});

