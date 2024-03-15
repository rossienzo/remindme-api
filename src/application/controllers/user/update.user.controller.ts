import { type Controller } from '../../../domain/protocols/controller.protocol'
import { type HttpResponse } from '../../../domain/protocols/http-response.protocol'
import { AlreadyExistsError } from '../../helpers/errors/alerady-exists.error'
import { badRequest, serverError } from '../../helpers/http-responses'
import { type Validator } from '../../../domain/protocols/validator.protocol'
import type { UpdateUserDTO, UpdateUserUseCase } from '../../usecases/user/update.user.usecase'

export interface UpdateUserRequest extends UpdateUserDTO {
    passwordConfirmation: string
}

export class UpdateUserController implements Controller {
    constructor (private readonly updateUser: UpdateUserUseCase, private readonly validator: Validator) {}
    async handle (request: UpdateUserRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(request)

            if (error) {
                return badRequest(error)
            }

            const result = await this.updateUser.execute(request)

            if (result instanceof AlreadyExistsError) {
                return badRequest(result)
            }

            return {
                body: '',
                statusCode: 204
            }
        } catch (error) {
            return serverError(error as Error)
        }
    }
}
