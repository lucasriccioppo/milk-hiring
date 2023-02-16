import { Request, Response, NextFunction } from 'express'
import { ObjectSchema, ValidationError } from 'yup'
import { ObjectShape } from 'yup/lib/object'
import ValidationErrorException from '../exceptions/ValidationErrorException'

const validation = <T extends ObjectShape> (schema: ObjectSchema<T>) => async (req: Request, res: Response, next: NextFunction) => {
    const params = {...req.params, ...req.body, ...req.query}

    try {
        await schema.validate(params)
        next()
    } catch (err) {
        next(new ValidationErrorException((err as ValidationError).errors.toString()))
    }
}

export default validation