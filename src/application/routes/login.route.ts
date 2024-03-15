import { type Router } from 'express'
import { routerAdapter } from '../adapters/router.adapter'
import { LoginControllerFactory } from '../factories/controllers/login/login.controller.factory'

export default (route: Router): void => {
    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Loga um usuário
     *     tags: [Login]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginParam'
     *     responses:
     *       200:
     *         description: Usuário logado com sucesso
     *         content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Login'
     *       400:
     *         $ref: '#/components/BadRequest'
     *       500:
     *         $ref: '#/components/ServerError'
     */
    route.post('/login', routerAdapter(LoginControllerFactory()))
}
