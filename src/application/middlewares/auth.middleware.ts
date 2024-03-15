import { type HttpResponse } from '../../domain/protocols/http-response.protocol'
import { type Middleware } from '../../domain/protocols/middleware.protocol'
import { AccessDeniedError } from '../helpers/errors/access-denied.error'
import { forbidden, ok } from '../helpers/http-responses'
import { type Decrypter } from '../protocols/cryptography/decrypter.protocol'
import { type GetByTokenAuthenticationRepository } from '../repositories/token/protocols/get-by-token.authentication.repository.protocol'

export interface AuthMiddlewareRequest {
    accessToken: string
}

export class AuthMiddleware implements Middleware {
    constructor (
        private readonly getByTokenAuthenticationRepository: GetByTokenAuthenticationRepository,
        private readonly decrypter: Decrypter,
        private readonly role?: string
    ) {}

    async handle (request: AuthMiddlewareRequest): Promise<HttpResponse> {
        const { accessToken } = request

        try {
            if (accessToken) {
                const decryptedData = await this.decrypter.decrypt(accessToken)

                if (decryptedData) {
                    const user = await this.getByTokenAuthenticationRepository.getByToken(accessToken, this.role)

                    if (user) {
                        return ok({ userId: user.id })
                    }
                }
            }

            return forbidden(new AccessDeniedError())
        } catch (error) {
            return forbidden(new AccessDeniedError())
        }
    }
}
