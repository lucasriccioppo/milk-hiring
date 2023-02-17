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
}
