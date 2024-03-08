import schemas from './schemas'
import { authSchema } from './baseSchemas/auth-schema'
import { BadRequestComponent } from './components/bad-request-component'
import { ServerErrorComponent } from './components/server-error-component'

export default {
    securitySchemes: {
        authKeyApi: authSchema
    },
    schemas,
    // HTTP Errors
    BadRequest: BadRequestComponent,
    ServerError: ServerErrorComponent
}
