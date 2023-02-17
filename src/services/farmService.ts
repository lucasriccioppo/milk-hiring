import ResourceNotFoundException from '../exceptions/ResourceNotFoundException'
import { Farm } from '../models/farm'
import FarmRepository from '../repositories/farmRepository'
import { IFarm } from '../models/types/IFarm'
import { IFarmService } from './types/IFarmService'
import ValidationErrorException from '../exceptions/ValidationErrorException'

const FarmService: IFarmService = {
    async validateCreateData(userId: string) {
        const farmInDatabase = await FarmRepository.findByUserId(userId)

        if(farmInDatabase) {
            throw new ValidationErrorException('Farm for this farmer already exists')
        }

        return Promise.resolve()
    },

    async createFarm(farm: IFarm) {
        await this.validateCreateData(farm.owner)

        const newFarm = new Farm()
        newFarm.name = farm.name
        newFarm.owner = farm.owner
        newFarm.distance = farm.distance
    
        return await FarmRepository.save(newFarm)
    },

    async findByUserOrFail(userId: string) {
        const farm = await FarmRepository.findByUserId(userId)
    
        if (!farm) {
            throw new ResourceNotFoundException('Farm was not found')
        }
    
        return farm
    },

    async findByIdOrFail(userId: string) {
        const farm = await FarmRepository.findById(userId)

        if(!farm) {
            throw new ResourceNotFoundException('Farm not found')
        }

        return Promise.resolve(farm)
    },
}

export default FarmService