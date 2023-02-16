import { Production } from '../models/production'
import database from '../database'
import { ObjectID } from 'typeorm'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(Production)

const save = async (production: Production) => await repository.save(production)

const findByFarmAndDate = async (/*farmId: ObjectID, */date: Date) => await repository.findBy({
    // farm: farmId,
    date
})

export default {
    save,
    findByFarmAndDate
}