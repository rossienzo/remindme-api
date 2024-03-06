import type { Response, Request, NextFunction } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}
