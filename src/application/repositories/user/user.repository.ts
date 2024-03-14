import { type User } from '../../../domain/entities/User'
import { type AddUserRepository } from './protocols/add.user.repository.protocol'
import { type FindByEmailUserRepository } from './protocols/find-by-email.user.repository.protocol'
import { type GetUserRepository } from './protocols/get.user.repository.protocol'

export class UserRepository implements AddUserRepository, FindByEmailUserRepository, GetUserRepository {
    private readonly users: User[] = []

    async add (user: User): Promise<boolean> {
        this.users.push(user)
        return true
    }

    async findByEmail (email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email)

        if (user) {
            return user
        }

        return null
    }

    async get (): Promise<User[]> {
        return await Promise.resolve(this.users)
    }
}
