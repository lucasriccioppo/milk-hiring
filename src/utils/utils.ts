import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import get from 'lodash/get'
import UnauthorizedException from '../exceptions/UnauthorizedException'
import BadRequestException from '../exceptions/BadRequestException'
import { UserTypes } from '../constants/userTypes'
import { IToken } from './types/IToken'

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env

const secret = JWT_SECRET || ''
const envExpirationTimeValue = parseInt(JWT_EXPIRATION_TIME || '')
const expirationTime = Number.isInteger(envExpirationTimeValue) ? envExpirationTimeValue : 5432

const encryptJwt = (content: Object, expiresIn: number = expirationTime) => jwt.sign(content, secret, { expiresIn })

const verifyJwt = (token: string) => {
    try {
        jwt.verify(token, secret)
    } catch(err) {
        console.log(`Error verifying Token: ${err}`)
        throw new BadRequestException('Error verifying Token')
    }
}

const decodeJwt = (token: string) => {
    try {
        return jwt.decode(token)
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

    const userId = get(decodedToken, 'userId' || '') || ''

    req.context = {
        userId
    }

    return next()
}

const protect = (role?: UserTypes) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers['authorization'] || ''
        token = token.replace('Bearer ', '')
        verifyJwt(token)
        
        let decodedToken

        try {
            decodedToken = <IToken> decodeJwt(token)
        } catch (err) {
            console.log(`Authentication Error => ${err}`)
            return next(new UnauthorizedException('Access denied'))
        }

        if(role) {
            if(decodedToken.role !== role) {
                return next(new UnauthorizedException('Access denied'))
            }
        }

        return next()
    }
}

export default {
    encryptJwt,
    getContext,
    protect
}
