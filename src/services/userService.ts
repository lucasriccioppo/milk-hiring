import { User } from '../models/user'
import UserRepository from '../repositories/userRepository'
import { IUser } from '../models/types/IUser'
import cryptoJs from 'crypto-js'
import UnauthorizedException from '../exceptions/UnauthorizedException'
import BadRequestException from '../exceptions/BadRequestException'
import utils from '../utils/utils'
import { IUserService } from './types/IUserService'
import ResourceNotFoundException from '../exceptions/ResourceNotFoundException'

const UserService: IUserService = {
    async checkCreteData(email: string) {
        const userInDatabase = await UserRepository.findByEmail(email)

        if (userInDatabase) {
            throw new BadRequestException('Email already exists on database')
        }

        return Promise.resolve()
    },

    async createFarmer(user: IUser) {
        await this.checkCreteData(user.email)

        const password = cryptoJs.MD5(user.password).toString()
        user.password = password

        const newFarmer = new User(user)
    
        return await UserRepository.save(newFarmer)
    },

    async login(email: string, password: string) {
        const encryptedPassword = cryptoJs.MD5(password).toString()

        const userInDatabase = await UserRepository.findByEmailAndPassword(email, encryptedPassword)
    
        if (!userInDatabase) {
            throw new UnauthorizedException('Access denied!')
        }
        
        const dataToEcrypt = {
            userId: userInDatabase.id,
            role: userInDatabase.type
        }

        return { token: utils.encryptJwt(dataToEcrypt) }
    }
}

export default UserService