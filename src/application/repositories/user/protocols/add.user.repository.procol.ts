import { type User } from '../../../../domain/entities/User'

export interface AddUserRepository {
    add: (user: User) => Promise<boolean>
}
