import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

export const ROLES: Role[] = [
    { id: '1', name: 'user' },
    { id: '2', name: 'admin' }
]

@Entity({ name: 'role' })
export class Role {
    @PrimaryGeneratedColumn()
        id?: string

    @Column({ type: 'varchar', length: 255 })
        name: string

    @OneToMany(() => User, user => user.id)
        users?: User[]
}
