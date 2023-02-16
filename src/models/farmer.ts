import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Farmer {
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
}
