import { Production } from '../../models/production'
import { IProduction } from '../../models/types/IProduction'
import { IProductionSummary } from './IProductionSummary'

export interface IProductionService {
    checkRegisterData: (farmId: string, date: Date) => Promise<void>
    registerProduction: (production: IProduction) => Promise<Production>
    getSummary: (farmId: string, month: number) => Promise<IProductionSummary>
}