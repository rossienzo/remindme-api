import { AddUserController } from '../../../controller/user/add.user.controller'

export const makeAddUserController = (): AddUserController => {
    return new AddUserController()
}
