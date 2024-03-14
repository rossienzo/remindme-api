import { type User } from '../../../../domain/entities/User'

export interface FindByEmailUserRepository {
    findByEmail: (email: string) => Promise<User | null>
}
