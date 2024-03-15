import { type UseCase } from '../../../domain/protocols/usecase.protocol'
import { type GetByIdUserRepository } from '../../repositories/user/protocols/get-by-id.user.repository.protocol'

export interface GetByIdDTO {
    id: string
}

export class GetByIdUserUseCase implements UseCase {
    constructor (
        private readonly getByIdUserRepository: GetByIdUserRepository
    ) {}

    async execute (data: GetByIdDTO): Promise<any> {
        return await this.getByIdUserRepository.getById(data.id)
    }
}
