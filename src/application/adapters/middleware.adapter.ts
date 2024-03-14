import { type Request, type Response, type NextFunction } from 'express'
import { type Middleware } from '../../domain/protocols/middleware.protocol'

export const middlewareAdapter = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const header = req.headers.authorization
        const token = header?.split(' ')[1]

        const request = {
            accessToken: token,
            ...(req || {})
        }

        const httpResponse = await middleware.handle(request)

        if (httpResponse.statusCode === 200) {
            Object.assign(req.body, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        }
    }
}
