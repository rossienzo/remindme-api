import type { User } from '../../../domain/entities/User'
import { type UseCase } from '../../../domain/protocols/usecase.protocol'
import { randomUUID } from 'crypto'
import { type AddUserRepository } from '../../repositories/user/protocols/add.user.repository.procol'
import { type FindByEmailUserRepository } from '../../repositories/user/protocols/find-by-email.user.repository.protocol'
import { AlreadyExistsError } from '../../helpers/errors/alerady-exists.error'

export interface AddUserDTO extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'remindMessages'> {}

export class AddUserUseCase implements UseCase {
    constructor (private readonly userRepo: AddUserRepository, private readonly findByEmail: FindByEmailUserRepository) {}
    async execute (data: AddUserDTO): Promise<any> {
        const userExists = await this.findByEmail.findByEmail(data.email)

        if (userExists) {
            return new AlreadyExistsError('email')
        }

        const user: User = {
            createdAt: new Date(),
            ...data
        }

        Object.assign(user, { id: randomUUID() })

        return await this.userRepo.add(user)
    }
}
