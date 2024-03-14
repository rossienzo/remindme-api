import { type Router } from 'express'
import { routerAdapter } from '../adapters/router.adapter'
import { LoginControllerFactory } from '../factories/controllers/login/login.controller.factory'

export default (route: Router): void => {
    route.post('/login', routerAdapter(LoginControllerFactory()))
}
