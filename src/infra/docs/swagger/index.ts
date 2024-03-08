import type swaggerJSDoc from 'swagger-jsdoc'
import components from './components'
import schemas from './schemas'

const optionsSwagger: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API do Sistema RemindMe APP',
            description: 'API para o aplicativo de lembretes pessoais.',
            version: '1.0.0',
            contact: {
                name: 'Enzo Rossi'
            }
        },
        servers: [{
            url: '/api',
            description: 'Servidor Principal'
        }],
        components,
        schemas
    },
    apis: ['./src/application/routes/**/*.ts']
}

export default optionsSwagger
