import { type Decrypter } from '../../application/protocols/cryptography/decrypter.protocol'
import { type EncryptResult, type Encrypter } from '../../application/protocols/cryptography/encrypter.protocol'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
    constructor (private readonly secret: string) {}

    async encrypt (plaintext: string, expiresIn: string = '1d'): Promise<EncryptResult> {
        const accessToken = jwt.sign({ id: plaintext }, this.secret, { expiresIn })
        const expirationDate = this.parseExpiresIn(expiresIn)
        return {
            accessToken,
            expirationDate: new Date(Date.now() + expirationDate)
        }
    }

    async decrypt (ciphertext: string): Promise<string> {
        return jwt.verify(ciphertext, this.secret) as string
    }

    private parseExpiresIn (expiresIn: string): number {
        const unit = expiresIn.slice(-1)
        const value = parseInt(expiresIn.slice(0, -1))

        switch (unit) {
            case 's':
                return value * 1000 // segundos
            case 'm':
                return value * 60 * 1000 // minutos
            case 'h':
                return value * 60 * 60 * 1000 // horas
            case 'd':
                return value * 24 * 60 * 60 * 1000 // dias
            default:
                throw new Error('Invalid expiresIn format')
        }
    }
}
