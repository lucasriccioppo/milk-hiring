import cryptoJs from "crypto-js"
import { UserTypes } from "../../main/constants/userTypes"
import { User } from "../../main/models/user"
import database from "../../main/configs/database"
import UserService from "../../main/services/userService"
import { Farm } from "../../main/models/farm"
import { Production } from "../../main/models/production"

const basePassword = 'teste123'

const createDefaultFarmerUser = async() : Promise<User> => {
    const user = new User()
    user.email = 'test@test.com'
    user.firstName = 'Test'
    user.lastName = 'Testando'
    user.password = cryptoJs.MD5(basePassword).toString()
    user.type = UserTypes.FARMER

    const insertedUser = await database.insert(User, user)

    return insertedUser.ops[0]
}

const createDefaultAdminUser = async() : Promise<User> => {
    const user = new User()
    user.email = 'test@admin.com'
    user.firstName = 'Test'
    user.lastName = 'Testando'
    user.password = cryptoJs.MD5(basePassword).toString()
    user.type = UserTypes.ADMIN

    const insertedUser = await database.insert(User, user)

    return insertedUser.ops[0]
}

const getToken = async(user: User) : Promise<string> => {
    const farmerAuthorization = await UserService.login(user.email, basePassword)
    return farmerAuthorization.token
}

const createFarm = async(name: string, farmerId: string, distance: number): Promise<Farm> => {
    const farm = new Farm()
    farm.name = name
    farm.owner = farmerId
    farm.distance = distance

    const insertedFarm = await database.insert(Farm, farm)
    return insertedFarm.ops[0]
}

const createProduction = async(quantity: number, date: Date, farmId: string): Promise<Production> => {
    const production = new Production()
    production.quantity = quantity
    production.date = date
    production.farm = farmId

    const insertedProduction = await database.insert(Production, production)
    return insertedProduction.ops[0]
}

export default {
    createDefaultFarmerUser,
    createDefaultAdminUser,
    getToken,
    createFarm,
    createProduction
}