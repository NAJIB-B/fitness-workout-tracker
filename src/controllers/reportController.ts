import User from "../models/userModel.ts";
import { ObjectId } from "mongoose"

import catchAsync from "../utils/catchAsync.ts";
import WorkoutHistory from "../models/workoutHistoryModel.ts";


export const generateReport = catchAsync(async (req, res, next) => {
  const userId = req.userId
  const id = (await User.findById(userId))?._id
  const report = await WorkoutHistory.aggregate([
    {
      $match: { owner: id }
    },
    {
      $lookup: {
        from: 'workouts',
        localField: 'workout',
        foreignField: '_id',
        as: 'workoutDetails'
      }
    },
    {
      $unwind: '$workoutDetails'
    },
    {
      $group: {
        _id: null,
        totalWorkouts: { $sum: 1 },
        totalExercises: { $sum: { $size: "$workoutDetails.exercises" } }
      }
    },
    {
      $project: {
        _id: 0,
        totalWorkouts: 1,
        totalExercises: 1
      }
    }
  ])

  res.status(200).json({
    message: 'success',
    report
  })
})
