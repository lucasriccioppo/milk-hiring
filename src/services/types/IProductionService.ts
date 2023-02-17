import { Production } from '../../models/production'
import { IProduction } from '../../models/types/IProduction'
import { IProductionSummary } from './IProductionSummary'
import { IValuePaid } from './IValuePaid'
import { IYearValuePaid } from './IYearValuePaid'

export interface IProductionService {
    checkRegisterData: (farmId: string, date: Date) => Promise<void>
    registerProduction: (production: IProduction) => Promise<Production>
    getProductionByFarmAndBetweenDates(farmId: string, from: Date, to: Date): Promise<Production[]>
    getProductionByFarmInMonth(farmId: string, month: number): Promise<Production[]>
    getSummary: (farmId: string, month: number) => Promise<IProductionSummary>
    calculatePaidValue(quantityProduced: number, distanceToFactory: number, month: number): Promise<number>
    getPaidValueByMonth(farmId: string, month: number, distanceToFactory: number): Promise<IValuePaid>
    getPaidValueByYear(farmId: string, year: number, distanceToFactory: number): Promise<IYearValuePaid>
}