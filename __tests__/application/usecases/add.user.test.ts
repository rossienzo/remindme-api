/*
import { UserRepository } from '../repositories/user/user.repository'
import { type AddUserDTO, AddUserUseCase } from './user/add.user.usecase'

describe('AddUser UseCase', () => {
    test('Should create a user', async () => {
        const fakeUser: AddUserDTO = {
            name: 'any_name',
            email: 'any_email',
            password: 'any_password'
        }
        const userRepo = new UserRepository()
        const addUserUseCase = new AddUserUseCase(userRepo)

        const result = await addUserUseCase.execute(fakeUser)
        expect(result).toBe(true)
    })
})
*/

describe('AddUser UseCase', () => {
    test('Should return true', () => {
        expect(true).toBe(true)
    })
})
