import BaseError from './BaseError'
import HttpStatus from 'http-status-codes'

class UnauthorizedException extends BaseError {
  constructor (
    description: string,
    name = 'Unauthorized',
    statusCode = HttpStatus.UNAUTHORIZED
  ) {
    super(name, statusCode, description)
  }
}

export default UnauthorizedException