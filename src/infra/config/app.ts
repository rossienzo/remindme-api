import express, { type Express } from 'express'
import { env } from './env'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import AppDataSource from '../data/data-source'
import swagger from './swagger'
import { MainSeeder } from '../data/seeds/main-seeder'

export class App {
    public port: number
    public app: Express

    constructor (port?: number) {
        this.app = express()
        this.port = port ?? Number(env.PORT)
        swagger(this.app)
        setupMiddlewares(this.app)
        setupRoutes(this.app)
    }

    async init (): Promise<void> {
        await AppDataSource.initialize()
            .then(async (db) => {
                await new MainSeeder().run(db)
            })
        this.app.listen(this.port, () => { console.log(`Server running at http://localhost:${this.port}`) })
    }
}
