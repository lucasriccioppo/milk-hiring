import BaseError from './BaseError'
import HttpStatus from 'http-status-codes'

class ValidationErrorException extends BaseError {
  constructor (
    description: string,
    name = 'UnprocessableEntity',
    statusCode = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(name, statusCode, description)
  }
}

export default ValidationErrorException