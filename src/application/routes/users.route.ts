import { type Router } from 'express'
import { routerAdapter } from '../adapters/router.adapter'
import { AddUserControllerFactory } from '../factories/controllers/user/add.user.factory'

export default (route: Router): void => {
    route.post('/users', routerAdapter(AddUserControllerFactory()))
}
