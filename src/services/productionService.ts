import { Production } from '../models/production'
import ProductionRepository from '../repositories/productionRepository'
import { IProduction } from '../models/types/IProduction'
import { IProductionService } from './types/IProductionService'
import moment from 'moment'
import ValidationException from '../exceptions/ValidationErrorException'

const ProductionService: IProductionService = {
    async registerProduction(production: IProduction) {
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
}



export default ProductionService