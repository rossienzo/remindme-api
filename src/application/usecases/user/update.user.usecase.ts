import type { User } from '../../../domain/entities/User'
import { type UseCase } from '../../../domain/protocols/usecase.protocol'
import { AlreadyExistsError } from '../../helpers/errors/alerady-exists.error'
import { type Hasher } from '../../protocols/cryptography/hasher.protocol'
import { type GetByEmailUserRepository } from '../../repositories/user/protocols/get-by-email.user.repository.protocol'
import { type UpdateUserRepository } from '../../repositories/user/protocols/update.user.repository.protocol'

export interface UpdateUserDTO extends Omit<User, 'createdAt' | 'updatedAt' | 'remindMessages'> {}

export class UpdateUserUseCase implements UseCase {
    constructor (
        private readonly userRepo: UpdateUserRepository,
        private readonly getByEmail: GetByEmailUserRepository,
        private readonly hasher: Hasher
    ) {}

    async execute (data: UpdateUserDTO): Promise<any> {
        const userExists = await this.getByEmail.getByEmail(data.email)

        if (userExists && userExists.id !== data.id) {
            return new AlreadyExistsError('email')
        }

        const user: User = {
            updatedAt: new Date(),
            ...data
        }

        if (data.password) {
            const password = await this.hasher.hash(data.password)
            Object.assign(user, { password })
        }

        return await this.userRepo.update(String(data.id), user)
    }
}
