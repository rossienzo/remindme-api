import { type Hasher } from '../../application/protocols/cryptography/hasher.protocol'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
    constructor (private readonly salt: number = 10) {}

    async hash (value: string): Promise<string> {
        return await bcrypt.hash(value, this.salt)
    }
}
