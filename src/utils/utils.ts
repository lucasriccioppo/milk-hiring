import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import get from 'lodash/get'
import UnauthorizedException from '../exceptions/UnauthorizedException'
import BadRequestException from '../exceptions/BadRequestException'

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env

const secret = JWT_SECRET || ''
const envExpirationTimeValue = parseInt(JWT_EXPIRATION_TIME || '')
const expirationTime = Number.isInteger(envExpirationTimeValue) ? envExpirationTimeValue : 5432

const encryptJwt = (content: Object, expiresIn: number = expirationTime) => jwt.sign(content, secret, { expiresIn })

const decodeJwt = (token: string) => {
    try {
        return jwt.verify(token, secret)
    } catch(err) {
        console.log(`Error decoding Token: ${err}`)
        throw new BadRequestException('Error decoding Token')
    }
}

const getContext = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'] || ''
    token = token.replace('Bearer ', '')

    if (token == '') {
        return next()
    }

    let decodedToken

    try {
        decodedToken = decodeJwt(token)
    } catch(err) {
        return next(err)
    }

    const farmerId = get(decodedToken, 'farmerId' || '') || ''

    req.context = {
        farmerId
    }

    return next()
}

const protect = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'] || ''
    token = token.replace('Bearer ', '')

    try {
        decodeJwt(token)
    } catch (err) {
        console.log(`Authentication Error => ${err}`)
       return next(new UnauthorizedException('Access denied'))
    }

    return next()
}

export default {
    encryptJwt,
    getContext,
    protect
}