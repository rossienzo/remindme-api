import { AuthenticationRepositoryTypeORM } from './../../../infra/data/typeorm/repositories/authentication.repository'
import { AuthMiddleware } from '../../middlewares/auth.middleware'
import { type Middleware } from '../../../domain/protocols/middleware.protocol'
import { ROLES } from '../../../domain/entities/Role'
import { JwtAdapter } from '../../../infra/cryptography/jwt.adapter'
import { env } from '../../../infra/config/env'

export const authMiddlewareFactory = (roleEnum: 'user' | 'admin' = 'user'): Middleware => {
    const role = roleEnum === 'user' ? ROLES[0].name : ROLES[1].name

    const authRepository = new AuthenticationRepositoryTypeORM()
    const decrypter = new JwtAdapter(String(env.JWT_SECRET))
    return new AuthMiddleware(authRepository, decrypter, role)
}
