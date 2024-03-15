import { type User } from '../../../../domain/entities/User'

export interface GetByIdUserRepository {
    getById: (id: string) => Promise<User | null>
}
