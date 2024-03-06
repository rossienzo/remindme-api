import { json, type Express } from 'express'
import { contentType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'

const setupMiddlewares = (app: Express): void => {
    app.use(json())
    app.use(contentType)
    app.use(cors)
}

export default setupMiddlewares
