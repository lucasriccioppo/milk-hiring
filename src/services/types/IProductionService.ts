import { Production } from '../../models/production'
import { IProduction } from '../../models/types/IProduction'

export interface IProductionService {
    registerProduction: (production: IProduction) => Promise<Production>
}