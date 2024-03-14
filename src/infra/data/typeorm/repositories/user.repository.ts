import type { ObjectLiteral, Repository } from 'typeorm'
import AppDataSource from '../../data-source'
import { User } from '../../../../domain/entities/User'
import { type AddUserRepository } from '../../../../application/repositories/user/protocols/add.user.repository.protocol'
import { type FindByEmailUserRepository } from '../../../../application/repositories/user/protocols/find-by-email.user.repository.protocol'
import { type GetUserRepository } from '../../../../application/repositories/user/protocols/get.user.repository.protocol'

export class UserRepositoryTypeORM implements AddUserRepository, FindByEmailUserRepository, GetUserRepository {
    private readonly repository: Repository<ObjectLiteral>

    constructor () {
        this.repository = AppDataSource.getRepository(User)
    }

    async add (user: User): Promise<boolean> {
        const newUser = this.repository.create(user)
        await this.repository.save(newUser)

        if (newUser.id === undefined) {
            return false
        }

        return true
    }

    async get (): Promise<User[]> {
        return await this.repository.find() as User[]
    }

    async findByEmail (email: string): Promise<User | null> {
        const user = await this.repository.findOne({ where: { email }, select: ['id', 'email', 'password'] })

        if (user) {
            return user as User
        }

        return null
    }
}
