import { middlewareAdapter } from '../../application/adapters/middleware.adapter'
import { authMiddlewareFactory } from '../../application/factories/middlewares/auth.middleware.factory'

export const auth = middlewareAdapter(authMiddlewareFactory())
