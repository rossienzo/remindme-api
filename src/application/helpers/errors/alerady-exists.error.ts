export class AlreadyExistsError extends Error {
    constructor (paramName: string) {
        super(`Already exists: ${paramName}`)
        this.name = 'AlreadyExistsError'
    }
}
