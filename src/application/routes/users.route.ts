import { type Router } from 'express'
import { routerAdapter } from '../adapters/router.adapter'
import { AddUserControllerFactory } from '../factories/controllers/user/add.user.factory'
import { GetUserControllerFactory } from '../factories/controllers/user/get.user.factory'
import { auth } from '../../infra/middlewares/auth'

export default (route: Router): void => {
    route.get('/users', auth, routerAdapter(GetUserControllerFactory()))
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Cria um novo usuário
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserParam'
     *     responses:
     *       204:
     *         description: Usuário criado com sucesso
     *       400:
     *         $ref: '#/components/BadRequest'
     *       500:
     *         $ref: '#/components/ServerError'
     */
    route.post('/users', routerAdapter(AddUserControllerFactory()))
}
