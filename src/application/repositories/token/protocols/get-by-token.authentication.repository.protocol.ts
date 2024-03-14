import { type User } from '../../../../domain/entities/User'

export interface GetByTokenAuthenticationRepository {
    getByToken: (token: string, role?: string) => Promise<User | null>
}
