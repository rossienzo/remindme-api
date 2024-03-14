import { type User } from '../../../../domain/entities/User'

export interface GetUserRepository {
    get: () => Promise<User[]>
}
