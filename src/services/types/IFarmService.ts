import { Farm } from '../../models/farm'
import { IFarm } from '../../models/types/IFarm'

export interface IFarmService {
    checkCreateData(userId: string): Promise<void>
    createFarm: (farm: IFarm) => Promise<Farm>
    findByUserOrFail: (userId: string) => Promise<Farm>
}