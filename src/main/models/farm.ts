import { Column, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne } from 'typeorm'
import { User } from './user'

@Entity()
export class Farm {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    name: string

    @OneToOne(() => User)
    @JoinColumn()
    owner: string
    
    @Column()
    distance: number // distance in kilometers to the factory
}
