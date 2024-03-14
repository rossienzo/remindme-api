import { type UseCase } from '../../../domain/protocols/usecase.protocol'
import { type GetUserRepository } from '../../repositories/user/protocols/get.user.repository.protocol'

export class GetUserUseCase implements UseCase {
    constructor (
        private readonly userRepo: GetUserRepository
    ) {}

    async execute (): Promise<any> {
        return await this.userRepo.get()
    }
}
