import BaseError from './BaseError'
import { StatusCodes } from 'http-status-codes'

class BadRequestException extends BaseError {
  constructor (
    description: string,
    name = 'BadRequest',
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(name, statusCode, description)
  }
}

export default BadRequestException