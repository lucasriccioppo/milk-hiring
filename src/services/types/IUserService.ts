import { User } from '../../models/user'
import { IUser } from '../../models/types/IUser'

export interface IUserService {
    checkCreteData(email: string): Promise<void>
    createFarmer(farmer: IUser): Promise<User>
    login(email: string, password: string): Promise<{ token: string }> 
}