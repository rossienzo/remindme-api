export interface EncryptResult {
    accessToken: string
    expirationDate: Date
}

export interface Encrypter {
    encrypt: (plaintext: string, expiresIn?: string) => Promise<EncryptResult>
}
