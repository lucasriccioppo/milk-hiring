import { Column, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne } from 'typeorm'
import { Farmer } from './farmer'

@Entity()
export class Farm {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    name: string

    @OneToOne(() => Farmer)
    @JoinColumn()
    owner: string
}
