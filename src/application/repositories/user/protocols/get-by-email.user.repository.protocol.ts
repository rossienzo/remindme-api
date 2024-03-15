import { type User } from '../../../../domain/entities/User'

export interface GetByEmailUserRepository {
    getByEmail: (email: string) => Promise<User | null>
}
