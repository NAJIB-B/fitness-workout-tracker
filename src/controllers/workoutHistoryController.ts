import catchAsync from "../utils/catchAsync.ts"
import WorkoutHistory from "../models/workoutHistoryModel.ts"

export const getAllHistory = catchAsync(async(req, res, next) => {

  const workoutHistory = await WorkoutHistory.find({owner: req.userId}).populate('workout', 'name').populate('comment', 'comment')

  res.status(200).json({
    message: 'success',
    workoutHistory
  })

})

export const getAnHistory = catchAsync(async(req, res, next) => {

  const {workoutHistoryId} = req.params


  const workoutHistory = await WorkoutHistory.findById(workoutHistoryId).populate('workout', 'name exercises').populate('comment', 'comment')

  res.status(200).json({
    message: 'success',
    workoutHistory
  })

})
