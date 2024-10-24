import jwt from "jsonwebtoken"
import Joi from "joi"

import User, {schema, IUser} from "../models/userModel.ts"
import catchAsync from "../utils/catchAsync.ts"
import AppError from "../utils/appError.ts"


const signToken = (user: IUser) => {
  const jwtSecret = process.env.JWT_SECRET
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN
  
  if (!jwtSecret) {
    throw new Error('enviroment variable for jwt secret not loaded')
  }

  return jwt.sign({id: user._id}, jwtSecret, {
    expiresIn: jwtExpiresIn
  })
}

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})


export const signUp = catchAsync(async(req, res, next) => {

  const {error, value} = schema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 400))
  }


 const user = await User.create(req.body) 

 const token = signToken(user)

 const data = {
   id: user._id,
   name: user.name,
   email: user.email
 }


  res.status(201).json({
    message: 'success',
    token,
    user: data
  })

})

export const login = catchAsync(async(req, res, next) => {

  const {error, value} = loginSchema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 400))
  }

  const user = await User.findOne({email: req.body.email})

  if (!user || !(await user.correctPassword(req.body.password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }
  
 const token = signToken(user)

 const data = {
   id: user._id,
   name: user.name,
   email: user.email
 }



  res.status(201).json({
    message: 'success',
    token,
    user: data
  })
})
