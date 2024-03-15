import Joi from 'joi'
import { JoiAdapter } from '../../../../infra/validation/joi.adapter'

export const addUserValidationFactory = (): JoiAdapter => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(100),
        email: Joi.string().email().required().min(5).max(200),
        password: Joi.string().required().min(6).max(60),
        role: Joi.object({
            id: Joi.string().required()
        }).required()
    })
    return new JoiAdapter(schema)
}
