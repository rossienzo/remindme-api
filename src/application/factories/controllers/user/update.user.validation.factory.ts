import Joi from 'joi'
import { JoiAdapter } from '../../../../infra/validation/joi.adapter'

export const updateUserValidationFactory = (): JoiAdapter => {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required().min(3).max(100),
        email: Joi.string().email().required().min(5).max(200),
        password: Joi.string().min(6).max(60),
        passwordConfirmation: Joi.when('password', {
            is: Joi.exist(),
            then: Joi.string().required().equal(Joi.ref('password'))
        }),
        role: Joi.object({
            id: Joi.string().required()
        }).required()
    })
    return new JoiAdapter(schema)
}
