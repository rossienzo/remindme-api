import { type Controller } from '../../../domain/protocols/controller.protocol'
import { type HttpResponse } from '../../../domain/protocols/http-response.protocol'
import { type Validator } from '../../../domain/protocols/validator.protocol'
import { NotExistsError } from '../../helpers/errors/not-exists.error'
import { badRequest, serverError } from '../../helpers/http-responses'
import type { LoginUseCase, LoginDTO } from '../../usecases/login/login.user.usecase'

export interface LoginRequest extends LoginDTO {}

export class LoginController implements Controller {
    constructor (private readonly login: LoginUseCase, private readonly validator: Validator) {}
    async handle (request: LoginRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(request)
            if (error) {
                return badRequest(error)
            }

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
