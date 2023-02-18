import { Farm } from '../models/farm'
import database from '../configs/database'
import { ObjectID } from 'mongodb'
import { IFarmRepository } from './types/IFarmRepository'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(Farm)

const FarmRepository: IFarmRepository = {
    async save(farm: Farm) {
        return await repository.save(farm)
    },

    async findByUserId(userId: string) {
        return await repository.findOneBy({ owner: userId })
    },

    async findById(farmId: string){
        return await repository.findOneBy({ _id: new ObjectID(farmId) })
    }
}

export default FarmRepository