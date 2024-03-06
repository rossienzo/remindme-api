import { Router, type Express } from 'express'
import fs from 'fs'
import path from 'path'

const setupRoutes = (app: Express): void => {
    const router = Router()
    app.use('/api', router)

    const dirPath = path.join(__dirname, '..', '..', 'application', 'routes')

    void Promise.all(fs.readdirSync(dirPath).map(async file => {
        if (!file.endsWith('.routes')) {
            (await import (`../../application/routes/${file}`)).default(router)
        }
    }))
}

export default setupRoutes
