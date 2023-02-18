import jwt from 'jsonwebtoken'
import BadRequestException from '../exceptions/BadRequestException'

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
export default {
    encryptJwt,
    verifyJwt,
    decodeJwt
}
