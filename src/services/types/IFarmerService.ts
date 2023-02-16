import { Farmer } from '../../models/farmer'
import { IFarmer } from '../../models/types/IFarmer'

export interface IFarmerService {
    createFarmer(farmer: IFarmer): Promise<Farmer>,
    login(email: string, password: string): Promise<{ token: string }> 
}