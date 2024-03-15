import { type Controller } from '../../../domain/protocols/controller.protocol'
import { type HttpResponse } from '../../../domain/protocols/http-response.protocol'
import { AlreadyExistsError } from '../../helpers/errors/alerady-exists.error'
import { badRequest, serverError } from '../../helpers/http-responses'
import type { AddUserDTO, AddUserUseCase } from '../../usecases/user/add.user.usecase'
import { type Validator } from '../../../domain/protocols/validator.protocol'

export class AddUserController implements Controller {
    constructor (private readonly addUser: AddUserUseCase, private readonly validator: Validator) {}
    async handle (request: AddUserDTO): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(request)

            if (error) {
                return badRequest(error)
            }

            const result = await this.addUser.execute(request)

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
