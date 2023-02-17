class BaseError extends Error {
    statusCode: number
    description: string

    constructor (name: string, statusCode: number, description: string) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        this.description = description
        Error.captureStackTrace(this)
    }
}
 
export default BaseError