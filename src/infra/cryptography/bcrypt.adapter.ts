import { type Comparer } from '../../application/protocols/cryptography/comparer.protocol'
import { type Hasher } from '../../application/protocols/cryptography/hasher.protocol'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, Comparer {
    constructor (private readonly salt: number = 10) {}

    async hash (value: string): Promise<string> {
        return await bcrypt.hash(value, this.salt)
    }

    async compare (value: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(value, hash)
    }
}
