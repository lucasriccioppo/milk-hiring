import { Production } from "../../models/production";

export interface IProductionRepository {
    save: (production: Production) => Promise<Production>
    findByFarmAndDate: (farmId: string, date: Date) => Promise<Production[]>
    findByFarmAndBetweenDates: (farmId: string, fromDate: Date, toDate: Date) => Promise<Production[]>
}