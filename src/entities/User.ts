import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { RemindMessage } from './RemindMessage'

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
        id: string

    @Column({ type: 'varchar', length: 255 })
        name: string

    @Column({ type: 'varchar', length: 255, unique: true })
        email: string

    @Column({ type: 'varchar', length: 64 })
        password: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date

    @UpdateDateColumn({ name: 'upload_at', type: 'timestamp' })
        updatedAt: Date

    @OneToMany(() => RemindMessage, remindMessage => remindMessage.user)
        remindMessages: RemindMessage[]
}
