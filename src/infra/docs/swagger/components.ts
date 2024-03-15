import schemas from './schemas'
import { BadRequestComponent } from './components/bad-request-component'
import { ServerErrorComponent } from './components/server-error-component'
import { AuthSchema } from './baseSchemas/auth-schema'

export default {
    securitySchemes: {
        bearerAuth: AuthSchema
    },
    schemas,
    // HTTP Errors
    BadRequest: BadRequestComponent,
    ServerError: ServerErrorComponent
}
