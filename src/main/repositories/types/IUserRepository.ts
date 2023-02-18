import { User } from "../../models/user"

export interface IUserRepository {
    save: (user: User) => Promise<User>
    findById: (userId: string) => Promise<User | null>
    findByEmail: (email: string) => Promise<User | null>
    findByEmailAndPassword: (email: string, password: string) => Promise<User | null>
}