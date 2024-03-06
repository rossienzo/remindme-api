import { type Controller } from '../../../../domain/protocols/controller.protocol'
import { LogErrorRepositoryTypeORM } from '../../../../infra/data/typeorm/repositories/log-error.repository'
import { AddErrorLogController } from '../../../decorators/add-error.log.controller'

export const logControllerFactory = (controller: Controller): Controller => {
    const logRepo = new LogErrorRepositoryTypeORM()
    return new AddErrorLogController(controller, logRepo)
}
