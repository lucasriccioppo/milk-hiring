import { Production } from '../models/production'
import ProductionRepository from '../repositories/productionRepository'
import { IProduction } from '../types/custom/types'
import moment from 'moment'
import ValidationException from '../exceptions/ValidationErrorException'

const registerProduction = async (production: IProduction) => {
    const newProduction = new Production()
    newProduction.quantity = production.quantity
    newProduction.farm = production.farm
    
    const date = moment().startOf('day').toDate()

    const productionInDatabase = await ProductionRepository.findByFarmAndDate(date)

    if (productionInDatabase.length > 0) {
        throw new ValidationException('The production of this day had already been registered')
    }
    
    newProduction.date = date

    return await ProductionRepository.save(newProduction)
}

export default {
    registerProduction
}