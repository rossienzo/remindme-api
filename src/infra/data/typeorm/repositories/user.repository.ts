import type { ObjectLiteral, Repository } from 'typeorm'
import AppDataSource from '../../data-source'
import { User } from '../../../../domain/entities/User'
import { type AddUserRepository } from '../../../../application/repositories/user/protocols/add.user.repository.protocol'
import { type GetUserRepository } from '../../../../application/repositories/user/protocols/get.user.repository.protocol'
import { type GetByEmailUserRepository } from '../../../../application/repositories/user/protocols/get-by-email.user.repository.protocol'
import { type GetByIdUserRepository } from '../../../../application/repositories/user/protocols/get-by-id.user.repository.protocol'
import { type UpdateUserRepository } from '../../../../application/repositories/user/protocols/update.user.repository.protocol'
import { type DeleteUserRepository } from '../../../../application/repositories/user/protocols/delete.user.repository.protocol'

export class UserRepositoryTypeORM implements AddUserRepository,
    GetByEmailUserRepository, GetUserRepository, GetByIdUserRepository, UpdateUserRepository, DeleteUserRepository {
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
        return await this.repository.find({ order: { createdAt: 'ASC' } }) as User[]
    }

    async getById (id: string): Promise<User | null> {
        const user = await this.repository.findOne({ where: { id }, select: ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'] })

        if (user) {
            return user as User
        }

        return null
    }

    async getByEmail (email: string): Promise<User | null> {
        const user = await this.repository.findOne({ where: { email }, select: ['id', 'email', 'password'] })

        if (user) {
            return user as User
        }

        return null
    }

    async update (id: string, data: User): Promise<boolean> {
        const updatedUser = await this.repository.update(id, data)

        if (updatedUser.affected === 1) {
            return true
        }

        return false
    }

    async delete (id: string): Promise<boolean> {
        const deletedUser = await this.repository.delete(id)

        if (deletedUser.affected === 1) {
            return true
        }

        return false
    }
}
