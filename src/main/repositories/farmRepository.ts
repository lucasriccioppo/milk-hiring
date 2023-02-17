import { Farm } from '../models/farm'
import database from '../database'
import { ObjectID } from 'mongodb'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(Farm)

const save = async (farm: Farm) => await repository.save(farm)

const findByUserId = async (userId: string) => await repository.findOneBy({ owner: userId })

const findById = async (farmId: string) => await repository.findOneBy({ _id: new ObjectID(farmId) })

export default {
    save,
    findByUserId,
    findById
}