import { type Controller } from '../../../../domain/protocols/controller.protocol'
import { UserRepositoryTypeORM } from '../../../../infra/data/typeorm/repositories/user.repository'
import { DeleteUserController } from '../../../controllers/user/delete.user.controller'
import { DeleteUserUseCase } from '../../../usecases/user/delete.user.usecase'
import { logControllerFactory } from '../log/add-error.log.factory'
import { deleteUserValidationFactory } from './delete.user.validation.factory'

export const DeleteUserControllerFactory = (): Controller => {
    const userRepo = new UserRepositoryTypeORM()
    const updateUser = new DeleteUserUseCase(userRepo, userRepo)

    const deleteUserController = new DeleteUserController(updateUser, deleteUserValidationFactory())
    return logControllerFactory(deleteUserController)
}
