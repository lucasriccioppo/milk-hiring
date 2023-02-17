import { Production } from '../models/production'
import ProductionRepository from '../repositories/productionRepository'
import { IProduction } from '../models/types/IProduction'
import { IProductionService } from './types/IProductionService'
import moment from 'moment'
import ValidationException from '../exceptions/ValidationErrorException'

const ProductionService: IProductionService = {
    async checkRegisterData(farmId: string, date: Date) {
        const productionInDatabase = await ProductionRepository.findByFarmAndDate(farmId, date)
    
        if (productionInDatabase.length > 0) {
            throw new ValidationException('The production of this day had already been registered')
        }

        return Promise.resolve()
    },

    async registerProduction(production: IProduction) {
        const date = moment().startOf('day').toDate()
    
        await this.checkRegisterData(production.farm, date)
        
        const newProduction = new Production()
        newProduction.quantity = production.quantity
        newProduction.farm = production.farm

        newProduction.date = date
    
        return await ProductionRepository.save(newProduction)
    },

    async getSummary(farmId: string, month: number) {
        const fromDate = moment().set({ month, day: 1 }).toDate()
        const toDate = moment(fromDate).add(1, 'month').toDate()
        const productionDocuments = await ProductionRepository.findByFarmAndBetweenDates(farmId, fromDate, toDate)

        let totalProduction = 0
        const productions = productionDocuments.map((production) => {
            totalProduction += production.quantity

            return {
                day: moment(production.date).date(),
                quantity: production.quantity
            }
        })

        return Promise.resolve({
            average: totalProduction / productionDocuments.length,
            productions
        })
    }
}



export default ProductionService