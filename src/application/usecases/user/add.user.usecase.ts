import type { User } from '../../../entities/User'
import type { UserRepository } from '../../../infra/data/typeorm/repositories/user.repository'
import { type UseCase } from '../usecase.protocol'

export interface AddUserDTO extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'rememberMessages'> {}

export class AddUserUseCase implements UseCase {
    constructor (private readonly userRepo: UserRepository) {}
    async execute (data: AddUserDTO): Promise<void> {
        await this.userRepo.add(data)
    }
}
