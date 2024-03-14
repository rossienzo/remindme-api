import { type Repository, type ObjectLiteral } from 'typeorm'
import AppDataSource from '../../data-source'
import { Authentication } from '../../../../domain/entities/Authentication'
import { type User } from '../../../../domain/entities/User'
import { type AddAuthenticationData, type AddAuthenticationRepository } from '../../../../application/repositories/token/protocols/add.authentication.repository.protocol'
import { type GetByIdAuthenticationRepository } from '../../../../application/repositories/token/protocols/get-by-id.authentication.repository.protocol'
import { type UpdateAuthenticationRepository, type UpdateAuthenticationData } from '../../../../application/repositories/token/protocols/update.authentication.protocol.ts'
import { type GetByTokenAuthenticationRepository } from '../../../../application/repositories/token/protocols/get-by-token.authentication.repository.protocol'

export class AuthenticationRepositoryTypeORM implements GetByIdAuthenticationRepository, GetByTokenAuthenticationRepository, AddAuthenticationRepository, UpdateAuthenticationRepository {
    private readonly repository: Repository<ObjectLiteral>

    constructor () {
        this.repository = AppDataSource.getRepository(Authentication)
    }

    async getByIdUser (id: string): Promise<User | null> {
        const userToken = await this.repository.findOne({ where: { user: { id } }, relations: ['user'] })

        if (userToken) {
            return userToken.user as User
        }

        return null
    }

    async getByToken (token: string, role?: string): Promise<User | null> {
        return await this.repository.findOne({
            where: [{
                token,
                user: { role: { name: role } }
            }, {
                token,
                user: { role: { name: 'admin' } }
            }],
            relations: ['user']
        }) as User
    }

    async add (user: AddAuthenticationData): Promise<void> {
        await this.repository.insert(user)
    }

    async update (id: string, data: UpdateAuthenticationData): Promise<void> {
        await this.repository.update({ user: { id } }, { ...data })
    }
}
