import BaseError from './BaseError'
import { StatusCodes } from 'http-status-codes'

class FailedDependencyException extends BaseError {
  constructor (
    description: string,
    name = 'FailedDependency',
    statusCode = StatusCodes.FAILED_DEPENDENCY
  ) {
    super(name, statusCode, description)
  }
}

export default FailedDependencyException