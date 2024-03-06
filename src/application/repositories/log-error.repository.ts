export class LogErrorRepository {
    async logError (stack: string): Promise<void> {
        console.log(stack)
    }
}
