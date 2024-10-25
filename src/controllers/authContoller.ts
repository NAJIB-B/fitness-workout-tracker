import jwt from "jsonwebtoken"


import User from "../models/userModel.ts"
import catchAsync from "../utils/catchAsync.ts"
import AppError from "../utils/appError.ts"


const jwtVerifyPromisified = (token: string, secret: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err)
      } else {
        resolve(payload)
      }
    })
  })
}

export const protect = catchAsync( async(req, res, next) => {
  let token
  if (req.headers.authorization && (req.headers.authorization).startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new AppError('You are not logged in, please login to access this route', 401))
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    return next(new AppError('jwt secret not loaded from enviroment', 500))
  }
  const decoded = await jwtVerifyPromisified(token, secret)

  const currentUser = await User.findById(decoded.id)

  if (!currentUser) {
    return next(new AppError('The user that owns this token no longer exist', 401))
  }


//  req.user = currentUser;
  next()
})

//exports.authorize = catchAsync( async(req, res,next) => {
//  const todo = await Todo.findById(req.params.todo)
//
//  if (!todo) {
//   return next(new AppError("No todo found with that ID", 404))
//  }
//  if (todo.owner.toString() !== req.user.id) {
//    return next(new AppError("You are not authorized to access this todo", 403))
//  }
//
//  next()
//})
