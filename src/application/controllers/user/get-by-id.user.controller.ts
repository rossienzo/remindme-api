import { badRequest, serverError } from '../../helpers/http-responses'
import type { GetByIdDTO, GetByIdUserUseCase } from './../../usecases/user/get-by-id.user.usecase'

export class GetByIdUserController {
    constructor (private readonly getByIdUserUseCase: GetByIdUserUseCase) {}

    async handle (data: GetByIdDTO): Promise<any> {
        try {
            const result = await this.getByIdUserUseCase.execute(data)

            if (!result) {
                return badRequest(new Error('User not found'))
            }

            return {
                body: result,
                statusCode: 200
            }
        } catch (error) {
            return serverError(error as Error)
        }
    }
}
