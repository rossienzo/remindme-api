import { type UseCase } from '../../../domain/protocols/usecase.protocol'
import { type DeleteUserRepository } from '../../repositories/user/protocols/delete.user.repository.protocol'
import { type GetByIdUserRepository } from '../../repositories/user/protocols/get-by-id.user.repository.protocol'

export interface DeleteUserDTO {
    id: string
}

export class DeleteUserUseCase implements UseCase {
    constructor (
        private readonly deleteUserRepository: DeleteUserRepository,
        private readonly getByIdRepository: GetByIdUserRepository
    ) {}

    async execute (data: DeleteUserDTO): Promise<boolean> {
        const userExists = await this.getByIdRepository.getById(data.id)

        if (!userExists) {
            return false
        }

        return await this.deleteUserRepository.delete(data.id)
    }
}
