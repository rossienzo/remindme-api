export const BadRequestComponent = {
    description: 'Requisição inválida',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/Error'
            }
        }
    }
}
