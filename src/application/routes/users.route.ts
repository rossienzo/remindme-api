import { type Request, type Response, type Router } from 'express'
import { makeAddUserController } from '../factories/controllers/user/add.user.factory'

export default (route: Router): void => {
    route.get('/users', async (req: Request, res: Response) => {
        await makeAddUserController().handle(req, res)
    })
}
