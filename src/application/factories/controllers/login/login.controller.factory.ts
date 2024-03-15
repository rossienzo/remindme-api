import { type Controller } from '../../../../domain/protocols/controller.protocol'
import { env } from '../../../../infra/config/env'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt.adapter'
import { JwtAdapter } from '../../../../infra/cryptography/jwt.adapter'
import { AuthenticationRepositoryTypeORM } from '../../../../infra/data/typeorm/repositories/authentication.repository'
import { UserRepositoryTypeORM } from '../../../../infra/data/typeorm/repositories/user.repository'
import { LoginController } from '../../../controllers/login/login.controller'
import { LoginUseCase } from '../../../usecases/login/login.user.usecase'
import { logControllerFactory } from '../log/add-error.log.factory'
import { loginValidationFactory } from './login.controller.validation.factory'

export const LoginControllerFactory = (): Controller => {
    const comparer = new BcryptAdapter()
    const encrypter = new JwtAdapter(String(env.JWT_SECRET))
    const userRepo = new UserRepositoryTypeORM()
    const authenticationRepository = new AuthenticationRepositoryTypeORM()
    const login = new LoginUseCase(userRepo, authenticationRepository, authenticationRepository, authenticationRepository, comparer, encrypter)
    const loginController = new LoginController(login, loginValidationFactory())
    return logControllerFactory(loginController)
}
