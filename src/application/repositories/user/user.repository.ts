import { type User } from '../../../domain/entities/User'
import { type AddUserRepository } from './protocols/add.user.repository.protocol'
import { type GetByEmailUserRepository } from './protocols/get-by-email.user.repository.protocol'
import { type GetUserRepository } from './protocols/get.user.repository.protocol'

export class UserRepository implements AddUserRepository, GetByEmailUserRepository, GetUserRepository {
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

    async getByEmail (email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email)

        if (user) {
            return user
        }

        return null
    }

    async get (): Promise<User[]> {
        return await Promise.resolve(this.users)
    }

    async getById (id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id)

        if (user) {
            return user
        }

        return null
    }
}
