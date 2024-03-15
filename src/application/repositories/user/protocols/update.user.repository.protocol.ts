import { type User } from '../../../../domain/entities/User'

export interface UpdateUserRepository {
    update: (id: string, data: User) => Promise<boolean>
}
