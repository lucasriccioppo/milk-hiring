import { Farm } from '../../models/farm'
import { IFarm } from '../../models/types/IFarm'

export interface IFarmService {
    checkCreateData(farmerId: string): Promise<void>
    createFarm: (farm: IFarm) => Promise<Farm>
    findByFarmerOrFail: (farmerId: string) => Promise<Farm>
}