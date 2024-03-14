import { type Authentication } from '../../../../domain/entities/Authentication'

export interface AddAuthenticationData extends Omit<Authentication, 'id' | 'createdAt'> {}

export interface AddAuthenticationRepository {
    add: (user: AddAuthenticationData) => Promise<void>
}
