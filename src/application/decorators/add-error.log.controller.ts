import { type Controller } from '../../domain/protocols/controller.protocol'
import { type HttpResponse } from '../../domain/protocols/http-response.protocol'
import { type LogErrorRepositoryTypeORM } from '../../infra/data/typeorm/repositories/log-error.repository'

export class AddErrorLogController implements Controller {
    constructor (private readonly controller: Controller, private readonly logRepo: LogErrorRepositoryTypeORM) {}

    async handle (request: any): Promise<HttpResponse> {
        const response = await this.controller.handle(request)
        if (response.statusCode === 500) {
            await this.logRepo.add(String(response.body.stack))
        }

        return response
    }
}
