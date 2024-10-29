import Comment, {schema} from "../models/commentModel.ts";
import catchAsync from "../utils/catchAsync.ts";
import AppError from "../utils/appError.ts";


export const createAComment = catchAsync(async(req, res, next) => {

  const {error, value} = schema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 401))
  }

  const comment = await Comment.create(req.body)

  res.status(201).json({
    message: 'success',
    comment
  })

})

