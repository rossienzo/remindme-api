import type { User } from '../../../domain/entities/User'
import { type UseCase } from '../../../domain/protocols/usecase.protocol'
import { randomUUID } from 'crypto'
import { type AddUserRepository } from '../../repositories/user/protocols/add.user.repository.protocol'
import { type FindByEmailUserRepository } from '../../repositories/user/protocols/find-by-email.user.repository.protocol'
import { AlreadyExistsError } from '../../helpers/errors/alerady-exists.error'
import { type Hasher } from '../../protocols/cryptography/hasher.protocol'

export interface AddUserDTO extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'remindMessages'> {}

export class AddUserUseCase implements UseCase {
    constructor (
        private readonly userRepo: AddUserRepository,
        private readonly findByEmail: FindByEmailUserRepository,
        private readonly hasher: Hasher
    ) {}

    async execute (data: AddUserDTO): Promise<any> {
        const userExists = await this.findByEmail.findByEmail(data.email)

        if (userExists) {
            return new AlreadyExistsError('email')
        }
        const password = await this.hasher.hash(data.password)
        const user: User = {
            createdAt: new Date(),
            ...data
        }

        Object.assign(user, { id: randomUUID() })
        Object.assign(user, { password })

        return await this.userRepo.add(user)
    }
}
