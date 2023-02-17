import { UserTypes } from '../../constants/userTypes'

export interface IUser {
    id?: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    type: UserTypes
}
