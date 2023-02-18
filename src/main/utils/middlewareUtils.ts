import { Request, Response, NextFunction } from 'express'
import get from 'lodash/get'
import UnauthorizedException from '../exceptions/UnauthorizedException'
import { UserTypes } from '../constants/userTypes'
import { IToken } from './types/IToken'
import JwtUtils from './jwtUtils'

const getContext = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'] || ''
    token = token.replace('Bearer ', '')

    if (token == '') {
        return next()
    }

    let decodedToken

    try {
        decodedToken = JwtUtils.decodeJwt(token)
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
        JwtUtils.verifyJwt(token)
        
        let decodedToken

        try {
            decodedToken = <IToken> JwtUtils.decodeJwt(token)
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
    getContext,
    protect
}
