import HttpStatus from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
import BaseError from '../exceptions/BaseError'

const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  return res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(err)
}

export default errorHandler