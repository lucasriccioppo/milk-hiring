import { User } from '../models/user'
import UserRepository from '../repositories/userRepository'
import { IUser } from '../models/types/IUser'
import cryptoJs from 'crypto-js'
import UnauthorizedException from '../exceptions/UnauthorizedException'
import BadRequestException from '../exceptions/BadRequestException'
import utils from '../utils/utils'
import { IUserService } from './types/IUserService'

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

        const newFarmer = new User()
        newFarmer.firstName = user.firstName
        newFarmer.lastName = user.lastName
        newFarmer.email = user.email
        newFarmer.password = cryptoJs.MD5(user.password).toString()
        newFarmer.type = user.type
    
        return await UserRepository.save(newFarmer)
    },

    async login(email: string, password: string) {
        const ecryptedPassword = cryptoJs.MD5(password).toString()
    
        const userInDatabase = await UserRepository.findByEmailAndPassword(email, ecryptedPassword)
    
        if (!userInDatabase) {
            throw new UnauthorizedException('Access denied!')
        }
    
        return { token: utils.encryptJwt({ userId: userInDatabase.id }) }
    }
}

export default UserService