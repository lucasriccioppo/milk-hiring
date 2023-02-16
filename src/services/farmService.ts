import ResourceNotFoundException from '../exceptions/ResourceNotFoundException'
import { Farm } from '../models/farm'
import FarmRepository from '../repositories/farmRepository'
import { IFarm } from '../types/custom/types'

const createFarm = async (farm: IFarm) => {
    const newFarm = new Farm()
    newFarm.name = farm.name
    newFarm.owner = farm.owner

    return await FarmRepository.save(newFarm)
}

const findByFarmerOrFail = async (farmerId: string) => {
    const farm = await FarmRepository.findByFarmerId(farmerId)

    if (!farm) {
        throw new ResourceNotFoundException('Farm was not found')
    }

    return farm
}

export default {
    createFarm,
    findByFarmerOrFail
}