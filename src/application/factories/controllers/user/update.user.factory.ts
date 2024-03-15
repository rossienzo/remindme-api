import { type Controller } from '../../../../domain/protocols/controller.protocol'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt.adapter'
import { UserRepositoryTypeORM } from '../../../../infra/data/typeorm/repositories/user.repository'
import { UpdateUserController } from '../../../controllers/user/update.user.controller'
import { UpdateUserUseCase } from '../../../usecases/user/update.user.usecase'
import { logControllerFactory } from '../log/add-error.log.factory'
import { updateUserValidationFactory } from './update.user.validation.factory'

export const UpdateUserControllerFactory = (): Controller => {
    const hasher = new BcryptAdapter()
    const userRepo = new UserRepositoryTypeORM()
    const updateUser = new UpdateUserUseCase(userRepo, userRepo, hasher)

    const updateUserController = new UpdateUserController(updateUser, updateUserValidationFactory())
    return logControllerFactory(updateUserController)
}
