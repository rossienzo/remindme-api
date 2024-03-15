import { ErrorSchema } from './baseSchemas/error-schema'
import { LoginSchema } from './baseSchemas/login-schema'
import { RoleSchema } from './baseSchemas/role-schema'
import { UserSchema } from './baseSchemas/user-schema'
import { LoginParamsSchema } from './paramSchemas/login-param-schema'
import { UserParamSchema } from './paramSchemas/user-param-schema'

export default {
    User: UserSchema,
    UserParam: UserParamSchema,
    Login: LoginSchema,
    LoginParam: LoginParamsSchema,
    Role: RoleSchema,
    Error: ErrorSchema
}
