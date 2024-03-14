import { type Controller } from '../../../domain/protocols/controller.protocol'
import { type HttpResponse } from '../../../domain/protocols/http-response.protocol'
import { NotExistsError } from '../../helpers/errors/not-exists.error'
import { badRequest, serverError } from '../../helpers/http-responses'
import type { LoginUseCase, LoginDTO } from '../../usecases/login/login.user.usecase'

export interface LoginRequest extends LoginDTO {}

export class LoginController implements Controller {
    constructor (private readonly login: LoginUseCase) {}
    async handle (request: LoginRequest): Promise<HttpResponse> {
        try {
            const result = await this.login.execute(request)

            if (!result) {
                return badRequest(new NotExistsError('user'))
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
