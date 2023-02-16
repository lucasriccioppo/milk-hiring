import BaseError from './BaseError'
import HttpStatus from 'http-status-codes'

class ResourceNotFoundException extends BaseError {
  constructor (
    description: string,
    name = 'ResourceNotFound',
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(name, statusCode, description)
  }
}

export default ResourceNotFoundException