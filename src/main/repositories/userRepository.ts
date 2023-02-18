import { User } from '../models/user'
import database from '../configs/database'
import { IUserRepository } from './types/IUserRepository'

const dataSource = database.getDataSource()
const repository = dataSource.getMongoRepository(User)

const UserRepository: IUserRepository = {
    async save(user:User) {
        return await repository.save(user)
    },

    async findById(userId: string) {
        return await repository.findOneBy({ id: userId })
    },

    async findByEmail(email: string) {
        return await repository.findOneBy({ email })
    },

    async findByEmailAndPassword(email: string, password: string) {
        return await repository.findOneBy({ email, password })
    }
}

export default UserRepository