import { Production } from '../models/production'
import database from '../database'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(Production)

const save = async (production: Production) => await repository.save(production)

const findByFarmAndDate = async (farmId: string, date: Date) => await repository.findBy({ farm: farmId, date })

const findByFarmAndBetweenDates = async (farmId: string, fromDate: Date, toDate: Date) => await repository.find({
    where: {
        farm: farmId,
        date: {
            $gte: fromDate,
            $lt: toDate
        }
    }
})

export default {
    save,
    findByFarmAndDate,
    findByFarmAndBetweenDates
}