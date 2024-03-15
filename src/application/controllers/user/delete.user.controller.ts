import { type Controller } from '../../../domain/protocols/controller.protocol'
import { type HttpResponse } from '../../../domain/protocols/http-response.protocol'
import { badRequest, serverError } from '../../helpers/http-responses'
import { type Validator } from '../../../domain/protocols/validator.protocol'
import { type DeleteUserUseCase, type DeleteUserDTO } from '../../usecases/user/delete.user.usecase'
import { NotFoundError } from '../../helpers/errors/not-found.error'

export class DeleteUserController implements Controller {
    constructor (private readonly deleteUser: DeleteUserUseCase, private readonly validator: Validator) {}
    async handle (request: DeleteUserDTO): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(request)

            if (error) {
                return badRequest(error)
            }

            const result = await this.deleteUser.execute(request)

            if (!result) {
                return badRequest(new NotFoundError('User'))
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
