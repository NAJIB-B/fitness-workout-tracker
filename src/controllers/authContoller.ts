import jwt from "jsonwebtoken";
import { Request } from "express";

import User, { IUser } from "../models/userModel.ts";
import Workout from "../models/workoutModel.ts"
import Exercise from "../models/exerciseModel.ts";
import catchAsync from "../utils/catchAsync.ts";
import AppError from "../utils/appError.ts";


interface CustomReq extends Request {
  userId? : string
}

const jwtVerifyPromisified = (token: string, secret: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "You are not logged in, please login to access this route",
        401,
      ),
    );
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new AppError("jwt secret not loaded from enviroment", 500));
  }
  const decoded = await jwtVerifyPromisified(token, secret);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user that owns this token no longer exist", 401),
    );
  }

  const id = currentUser._id;

  if (id) {
    req.userId = id.toString()
  }


  next();
});

export const authorizeExercise = catchAsync( async(req, res,next) => {
  const exerciseId = req.params?.exerciseId

  const exercise = await Exercise.findById(exerciseId)

  if (!exercise) {
   return next(new AppError("No exercise found with that ID", 404))
  }
  if (exercise.owner.toString() !== req?.userId) {
    return next(new AppError("You are not authorized to access this exercise", 403))
  }

  next()
})

export const authorizeWorkout = catchAsync( async(req, res,next) => {
  const workoutId = req.params?.workoutId

  const workout = await Workout.findById(workoutId)

  if (!workout) {
   return next(new AppError("No workout found with that ID", 404))
  }
  if (workout.owner.toString() !== req?.userId) {
    return next(new AppError("You are not authorized to access this workout", 403))
  }

  next()
})
