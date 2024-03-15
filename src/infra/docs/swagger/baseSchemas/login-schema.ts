export const LoginSchema = {
    type: 'object',
    properties: {
        accessToken: {
            type: 'string'
        },
        expirationDate: {
            type: 'string'
        }
    }
}
