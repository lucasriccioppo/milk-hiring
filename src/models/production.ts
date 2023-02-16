import { Column, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne } from 'typeorm'
import { Farm } from './farm'

@Entity()
export class Production {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    quantity: number

    @Column()
    date: Date

    @OneToOne(() => Farm)
    @JoinColumn()
    farm: string
}
