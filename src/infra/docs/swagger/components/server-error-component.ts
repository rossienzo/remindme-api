export const ServerErrorComponent = {
    description: 'Erro interno no servidor',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/Error'
            }
        }
    }
}
