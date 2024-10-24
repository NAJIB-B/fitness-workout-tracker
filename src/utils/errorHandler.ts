import { NextFunction, Request, Response } from "express";
import AppError from "./appError"

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

  console.log(err)

  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    stack: err.stack,
  })
};
