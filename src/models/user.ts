import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { UserTypes } from '../constants/userTypes'
import { IUser } from './types/IUser'

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    type: UserTypes

    constructor(user: IUser) {
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.password = user.password
        this.type = user.type
    }
}
