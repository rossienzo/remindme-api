import type { ObjectLiteral, Repository } from 'typeorm'
import AppDataSource from '../../data-source'
import { LogError } from '../../../../domain/entities/LogError'

export class LogErrorRepositoryTypeORM {
    private readonly repository: Repository<ObjectLiteral>

    constructor () {
        this.repository = AppDataSource.getRepository(LogError)
    }

    async add (stack: string): Promise<void> {
        await this.repository.save({ stack })
    }
}
