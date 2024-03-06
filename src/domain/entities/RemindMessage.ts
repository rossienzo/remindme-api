import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'

@Entity({ name: 'remind_message' })
export class RemindMessage {
    @PrimaryGeneratedColumn('uuid')
        id: string

    @Column({ type: 'varchar', length: 300 })
        title: string

    @Column({ type: 'varchar', length: 3000 })
        message: string

    @Column({ name: 'remind_date', type: 'timestamp' })
        remindDate: Date

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date

    @UpdateDateColumn({ name: 'upload_at', type: 'timestamp' })
        updatedAt: Date

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
        user: User
}
