import {Request, Response, NextFunction} from "express"


const catchAsync = (asyncFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFunc(req, res, next).catch((err: Error) => next(err))
  }
}


export default catchAsync
