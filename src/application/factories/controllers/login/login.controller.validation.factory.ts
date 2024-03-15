import Joi from 'joi'
import { JoiAdapter } from '../../../../infra/validation/joi.adapter'

export const loginValidationFactory = (): JoiAdapter => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return new JoiAdapter(schema)
}
