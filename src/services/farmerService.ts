import { Farmer } from '../models/farmer'
import FarmerRepository from '../repositories/farmerRepository'
import { IFarmer } from '../types/custom/types'
import cryptoJs from 'crypto-js'
import UnauthorizedException from '../exceptions/UnauthorizedException'
import utils from '../utils/utils'
import { IFarmerService } from './types/IFarmerService'

const FarmerService: IFarmerService = {
    async createFarmer(farmer: IFarmer) {
        const newFarmer = new Farmer()
        newFarmer.firstName = farmer.firstName
        newFarmer.lastName = farmer.lastName
        newFarmer.email = farmer.email
        newFarmer.password = cryptoJs.MD5(farmer.password).toString()
    
        return await FarmerRepository.save(newFarmer)
    },

    async login(email: string, password: string) {
        const ecryptedPassword = cryptoJs.MD5(password).toString()
    
        const farmerInDatabase = await FarmerRepository.findByEmailAndPassword(email, ecryptedPassword)
    
        if (!farmerInDatabase) {
            throw new UnauthorizedException('Access denied!')
        }
    
        return { token: utils.encryptJwt({ farmerId: farmerInDatabase.id }) }
    }
}

export default FarmerService