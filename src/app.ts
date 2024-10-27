import express, { NextFunction } from "express"

import userRouter from "./routes/userRoute.ts"
import exerciseRouter from "./routes/exerciseRoute.ts"
import workoutRouter from "./routes/workoutRoute.ts"
import AppError from "./utils/appError.ts"
import {errorHandler} from "./utils/errorHandler.ts"


const app = express()

app.use(express.json())


app.use("/api/v1/user", userRouter)
app.use("/api/v1/exercise", exerciseRouter)
app.use("/api/v1/workout", workoutRouter)

app.all("*", (req, res, next) => {

  return next(new AppError('Not found. Please check the url and try again', 404))
})

app.use(errorHandler);

export default app
