export class NotExistsError extends Error {
    constructor (entity: string) {
        super(`Not exists: ${entity}`)
        this.name = 'NotExistsError'
    }
}
