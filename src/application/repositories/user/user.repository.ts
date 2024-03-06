import { type User } from '../../../domain/entities/User'
import { type AddUserRepository } from './protocols/add.user.repository.procol'
import { type FindByEmailUserRepository } from './protocols/find-by-email.user.repository.protocol'

export class UserRepository implements AddUserRepository, FindByEmailUserRepository {
    private readonly users: User[] = []

    async add (user: User): Promise<boolean> {
        this.users.push(user)
        return true
    }

    async findByEmail (email: string): Promise<boolean> {
        const user = this.users.find(user => user.email === email)

        if (user) {
            return true
        }

        return false
    }
}
