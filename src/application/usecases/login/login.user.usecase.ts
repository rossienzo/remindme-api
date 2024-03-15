import { type UseCase } from '../../../domain/protocols/usecase.protocol'
import { type Comparer } from '../../protocols/cryptography/comparer.protocol'
import { type Encrypter } from '../../protocols/cryptography/encrypter.protocol'
import { type AddAuthenticationRepository } from '../../repositories/token/protocols/add.authentication.repository.protocol'
import { type GetByIdAuthenticationRepository } from '../../repositories/token/protocols/get-by-id.authentication.repository.protocol'
import { type UpdateAuthenticationRepository } from '../../repositories/token/protocols/update.authentication.protocol.ts'
import { type GetByEmailUserRepository } from '../../repositories/user/protocols/get-by-email.user.repository.protocol'

export interface LoginDTO {
    email: string
    password: string
}

export interface LoginResponse {
    accessToken: string
    expirationDate: Date
}

export class LoginUseCase implements UseCase {
    constructor (
        private readonly getByEmailRepository: GetByEmailUserRepository,
        private readonly addTokenRepository: AddAuthenticationRepository,
        private readonly getByIdUserTokenRepository: GetByIdAuthenticationRepository,
        private readonly updateTokenRepository: UpdateAuthenticationRepository,
        private readonly comparer: Comparer,
        private readonly encrypter: Encrypter
    ) {}

    async execute (data: LoginDTO): Promise<LoginResponse | null> {
        const user = await this.getByEmailRepository.getByEmail(data.email)

        if (user) {
            const passwordMatch = await this.comparer.compare(data.password, user.password)

            if (passwordMatch) {
                const encryptedData = await this.encrypter.encrypt(String(user.id))
                const tokenExists = await this.getByIdUserTokenRepository.getByIdUser(String(user.id))

                if (tokenExists) {
                    await this.updateTokenRepository.update(String(user.id), { token: encryptedData.accessToken })
                } else {
                    await this.addTokenRepository.add({ token: encryptedData.accessToken, user })
                }
                return {
                    accessToken: encryptedData.accessToken,
                    expirationDate: encryptedData.expirationDate
                }
            }
        }

        return null
    }
}
