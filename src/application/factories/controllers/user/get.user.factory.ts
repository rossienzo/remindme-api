import { type Controller } from '../../../../domain/protocols/controller.protocol'
import { UserRepositoryTypeORM } from '../../../../infra/data/typeorm/repositories/user.repository'
import { GetUserController } from '../../../controllers/user/get.user.controller'
import { GetUserUseCase } from '../../../usecases/user/get.user.usecase'
import { logControllerFactory } from '../log/add-error.log.factory'

export const GetUserControllerFactory = (): Controller => {
    const userRepo = new UserRepositoryTypeORM()
    const getUser = new GetUserUseCase(userRepo)
    const getUserController = new GetUserController(getUser)
    return logControllerFactory(getUserController)
}
