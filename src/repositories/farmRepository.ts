import { Farm } from '../models/farm'
import database from '../database'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(Farm)

const save = async (farm: Farm) => await repository.save(farm)

const findByUserId = async (userId: string) => await repository.findOneBy({ owner: userId })

export default {
    save,
    findByUserId
}