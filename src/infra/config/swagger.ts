import { serve, setup } from 'swagger-ui-express'
import type { Express } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import optionsSwagger from '../docs/swagger'

export default (app: Express): void => {
    app.use('/api-docs', serve, setup(swaggerJSDoc(optionsSwagger)))
}
