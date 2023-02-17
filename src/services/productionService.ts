import { Production } from '../models/production'
import ProductionRepository from '../repositories/productionRepository'
import { IProduction } from '../models/types/IProduction'
import { IProductionService } from './types/IProductionService'
import moment from 'moment'
import ValidationException from '../exceptions/ValidationErrorException'
import FarmService from './farmService'
import SemesterValues from '../constants/semesterValues'
import utils from '../utils/utils'
import { IValuePaid } from './types/IValuePaid'

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

    async getProductionByFarmAndBetweenDates(farmId: string, month: number) {
        await FarmService.findByIdOrFail(farmId)

        const fromDate = moment().set({ month: month - 1, day: 1 }).startOf('month').toDate()
        const toDate = moment(fromDate).add(1, 'month').toDate()

        return await ProductionRepository.findByFarmAndBetweenDates(farmId, fromDate, toDate)
    },

    async getSummary(farmId: string, month: number) {
        const productionDocuments = await this.getProductionByFarmAndBetweenDates(farmId, month)

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
    },

    async calculatePaidValue(quantityProduced: number, distanceToFactory: number, month: number) {
        const isFirstSemester = SemesterValues.FIRST_SEMESTER.includes(month)
        const isDistanceLow = distanceToFactory <= 50 ? true : false
        const isHighQuantity = quantityProduced > 10000

        const basePrice = isFirstSemester ? 1.8 : 1.95
        const pricePerKm = isFirstSemester ? (isDistanceLow ? 0.05 : 0.06) : 0
        const bonus = isFirstSemester ? 0 : (isHighQuantity ? 0.01 : 0)

        return Promise.resolve((quantityProduced * basePrice) - (pricePerKm * distanceToFactory) + (bonus * quantityProduced))
    },

    async getPaidValueByMonth(farmId: string, month: number, distanceToFactory: number) {
        const productionDocuments = await this.getProductionByFarmAndBetweenDates(farmId, month)

        const initialValue = 0
        const totalQuantity = productionDocuments.reduce((accumulator, production) => accumulator + production.quantity, initialValue)

        const brlValue = await this.calculatePaidValue(totalQuantity, month, distanceToFactory)
        const usdValue = await utils.convertBrlToUsd(brlValue)

        return <IValuePaid> {
            brl: `R$ ${brlValue.toFixed(2).replace('.', ',')}`,
            usd: `$ ${usdValue.toFixed(2).replace('.', ',')}`
        }
    }
}



export default ProductionService