import { type Controller } from '../../../domain/protocols/controller.protocol'
import { type HttpResponse } from '../../../domain/protocols/http-response.protocol'
import { serverError } from '../../helpers/http-responses'
import { type GetUserUseCase } from '../../usecases/user/get.user.usecase'

export class GetUserController implements Controller {
    constructor (private readonly getUser: GetUserUseCase) {}
    async handle (request: any): Promise<HttpResponse> {
        try {
            const result = await this.getUser.execute()

            return {
                body: result,
                statusCode: 200
            }
        } catch (error) {
            return serverError(error as Error)
        }
    }
}
