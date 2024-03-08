import { type Controller } from '../../../../domain/protocols/controller.protocol'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt.adapter'
import { UserRepositoryTypeORM } from '../../../../infra/data/typeorm/repositories/user.repository'
import { AddUserController } from '../../../controllers/user/add.user.controller'
import { AddUserUseCase } from '../../../usecases/user/add.user.usecase'
import { logControllerFactory } from '../log/add-error.log.factory'

export const AddUserControllerFactory = (): Controller => {
    const hasher = new BcryptAdapter()
    const userRepo = new UserRepositoryTypeORM()
    const addUser = new AddUserUseCase(userRepo, userRepo, hasher)
    const addUserController = new AddUserController(addUser)
    return logControllerFactory(addUserController)
}
