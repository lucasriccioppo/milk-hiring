import { Farm } from '../../models/farm'
import { IFarm } from '../../models/types/IFarm'

export interface IFarmService {
    validateCreateData(userId: string): Promise<void>
    createFarm: (farm: IFarm) => Promise<Farm>
    findByUserOrFail: (userId: string) => Promise<Farm>
    findByIdOrFail(userId: string): Promise<Farm>
}