import { Farmer } from '../models/farmer'
import database from '../database'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(Farmer)

const save = async (farmer: Farmer) => await repository.save(farmer)

const findById = async (farmerId: string) => await repository.findOneBy({ id: farmerId })

const findByEmail = async (email: string) => await repository.findOneBy({ email })

const findByEmailAndPassword = async (email: string, password: string) => await repository.findOneBy({ email, password })

export default {
    save,
    findById,
    findByEmail,
    findByEmailAndPassword
}