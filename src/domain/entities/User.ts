import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { RemindMessage } from './RemindMessage'
import { Authentication } from './Authentication'
import { Role } from './Role'

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
        id?: string

    @Column({ type: 'varchar', length: 255, nullable: false })
        name: string

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
        email: string

    @Column({ type: 'varchar', length: 64, nullable: false, select: false })
        password: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date

    @UpdateDateColumn({ name: 'upload_at', type: 'timestamp' })
        updatedAt?: Date

    @ManyToOne(() => Role, role => role.users, { nullable: false, eager: true })
    @JoinColumn({ name: 'role_id' })
        role: Role

    @OneToMany(() => RemindMessage, remindMessage => remindMessage.user)
        remindMessages?: RemindMessage[]

    @OneToOne(() => Authentication, auth => auth.user)
        authentication?: Authentication
}
