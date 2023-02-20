import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { UserTypes } from '../constants/userTypes'

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectID

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
