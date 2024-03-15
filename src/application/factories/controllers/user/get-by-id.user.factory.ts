import { UserRepositoryTypeORM } from '../../../../infra/data/typeorm/repositories/user.repository'
import { GetByIdUserController } from '../../../controllers/user/get-by-id.user.controller'
import { GetByIdUserUseCase } from '../../../usecases/user/get-by-id.user.usecase'

export const GetByIdUserControllerFactory = (): GetByIdUserController => {
    const userRepo = new UserRepositoryTypeORM()
    const getByIdUserUseCase = new GetByIdUserUseCase(userRepo)
    return new GetByIdUserController(getByIdUserUseCase)
}
