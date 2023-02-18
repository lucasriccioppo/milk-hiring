import { Production } from '../models/production'
import database from '../configs/database'
import { IProductionRepository } from './types/IProductionRepository'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(Production)

const ProductionRepository: IProductionRepository = {
    async save(production: Production) {
        return await repository.save(production)
    },

    async findByFarmAndDate(farmId: string, date: Date) {
        return await repository.findBy({ farm: farmId, date })
    },

    async findByFarmAndBetweenDates(farmId: string, fromDate: Date, toDate: Date) {
        return await repository.find({
            where: {
                farm: farmId,
                date: {
                    $gte: fromDate,
                    $lt: toDate
                }
            }
        })
    }
}

export default ProductionRepository