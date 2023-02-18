import { Farm } from "../../models/farm";

export interface IFarmRepository {
    save: (farm: Farm) => Promise<Farm>
    findByUserId: (userId: string) => Promise<Farm | null>
    findById: (farmId: string) => Promise<Farm | null>
}