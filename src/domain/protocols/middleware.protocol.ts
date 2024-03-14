import { type HttpResponse } from './http-response.protocol'

export interface Middleware <T = any> {
    handle: (request: T) => Promise<HttpResponse>
}
