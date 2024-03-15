import { RoleSchema } from '../baseSchemas/role-schema'

export const UserParamSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        passwordConfirmation: {
            type: 'string'
        },
        role: RoleSchema
    },
    required: ['name', 'email', 'password']
}
