import { ErrorSchema } from './baseSchemas/error-schema'
import { UserSchema } from './baseSchemas/user-schema'
import { UserParamSchema } from './paramSchemas/user-param-schema'

export default {
    User: UserSchema,
    UserParam: UserParamSchema,
    Error: ErrorSchema
}
