import type { ObjectLiteral, Repository } from 'typeorm'
import type { AddUserDTO } from '../../../../application/usecases/user/add.user.usecase'

export class UserRepository {
    private readonly repository: Repository<ObjectLiteral>

    async add (user: AddUserDTO): Promise<boolean> {
        const newUser = this.repository.create(user)
        await this.repository.save(newUser)

        if (newUser.id === undefined) {
            return false
        }

        return true
    }
}
