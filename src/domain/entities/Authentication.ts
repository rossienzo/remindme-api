import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'

@Entity({ name: 'authentication' })
export class Authentication {
    @PrimaryGeneratedColumn()
        id?: string

    @Column({ type: 'varchar', length: 1000 })
        token: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date

    @UpdateDateColumn({ name: 'upload_at', type: 'timestamp' })
        updatedAt?: Date

    @OneToOne(() => User, user => user.id, { cascade: true })
    @JoinColumn({ name: 'user_id' })
        user?: User
}
