import { type HttpResponse } from '../../domain/protocols/http-response.protocol'
import { ServerError } from './errors/server.error'

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(String(error.stack))
})

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})
