import type { ObjectLiteral, Repository } from 'typeorm'
import AppDataSource from '../../data-source'
import { User } from '../../../../domain/entities/User'
import { type AddUserRepository } from '../../../../application/repositories/user/protocols/add.user.repository.procol'
import { type FindByEmailUserRepository } from '../../../../application/repositories/user/protocols/find-by-email.user.repository.protocol'

export class UserRepositoryTypeORM implements AddUserRepository, FindByEmailUserRepository {
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

    async findByEmail (email: string): Promise<boolean> {
        return await this.repository.findOne({ where: { email } }) !== null
    }
}
