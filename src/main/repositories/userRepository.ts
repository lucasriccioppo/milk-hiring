import { User } from '../models/user'
import database from '../database'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(User)

const save = async (user: User) => await repository.save(user)

const findById = async (userId: string) => await repository.findOneBy({ id: userId })

const findByEmail = async (email: string) => await repository.findOneBy({ email })

const findByEmailAndPassword = async (email: string, password: string) => await repository.findOneBy({ email, password })

export default {
    save,
    findById,
    findByEmail,
    findByEmailAndPassword
}