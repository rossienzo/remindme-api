import { Request, Response } from 'express';

export class AddUserController {
    async handle (req: Request, res: Response) {
        return res.json('hello')
    }
}
