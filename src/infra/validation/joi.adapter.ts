import { InvalidParamError } from '../../application/helpers/errors/invalid-param.error'
import { MissingParamError } from '../../application/helpers/errors/missing-param.error'
import { type Validator } from './../../domain/protocols/validator.protocol'
import { type ObjectSchema } from 'joi'

export class JoiAdapter implements Validator {
    private readonly schema: ObjectSchema<any>

    constructor (schema: ObjectSchema<any>) {
        this.schema = schema
    }

    validate (data: any): Error | null {
        const result = this.schema.validate(data)

        if (result.error) {
            const message = result.error.message.replace(/"/g, '')

            if (message.includes('required')) {
                return new MissingParamError(message)
            }

            return new InvalidParamError(message)
        }
        return null
    }
}
