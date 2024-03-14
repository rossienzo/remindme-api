import { type User } from '../../../../domain/entities/User'

export interface GetByIdAuthenticationRepository {
    getByIdUser: (id: string) => Promise<User | null>
}
