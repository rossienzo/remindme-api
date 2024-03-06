import type { NextFunction, Request, Response } from 'express'
import type { Controller } from '../../domain/protocols/controller.protocol'
import { env } from '../../infra/config/env'

export const routerAdapter = (controller: Controller) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const request = { ...req.body ?? {}, ...req.params ?? {}, ...req.query ?? {} }

        const response = await controller.handle(request)

        if (response.statusCode > 299) {
            if (env.NODE_ENV === 'development') {
                console.error(response.body)
            }
            return res.status(response.statusCode).json({ error: response.body.message })
        }

        return res.status(response.statusCode).json(response.body)
    }
}
