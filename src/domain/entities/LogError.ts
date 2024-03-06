import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('log_error')
export class LogError {
    @PrimaryGeneratedColumn()
        id: number

    @Column()
        stack: string
}
