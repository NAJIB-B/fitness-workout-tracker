import {Request, Response, NextFunction} from "express"

interface CustomReq extends Request {
  userId? : string
}


const catchAsync = (asyncFunc: (req: CustomReq, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFunc(req, res, next).catch((err: Error) => next(err))
  }
}


export default catchAsync
