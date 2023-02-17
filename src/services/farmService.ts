import ResourceNotFoundException from '../exceptions/ResourceNotFoundException'
import { Farm } from '../models/farm'
import FarmRepository from '../repositories/farmRepository'
import { IFarm } from '../models/types/IFarm'
import { IFarmService } from './types/IFarmService'
import ValidationErrorException from '../exceptions/ValidationErrorException'

const FarmService: IFarmService = {
    async checkCreateData(userId: string) {
        const farmInDatabase = await FarmRepository.findByUserId(userId)

        if(farmInDatabase) {
            throw new ValidationErrorException('Farm for this farmer already exists')
        }

        return Promise.resolve()
    },

    async createFarm(farm: IFarm) {
        await this.checkCreateData(farm.owner)

        const newFarm = new Farm()
        newFarm.name = farm.name
        newFarm.owner = farm.owner
    
        return await FarmRepository.save(newFarm)
    },

    async findByUserOrFail(userId: string) {
        const farm = await FarmRepository.findByUserId(userId)
    
        if (!farm) {
            throw new ResourceNotFoundException('Farm was not found')
        }
    
        return farm
    }
}

export default FarmService