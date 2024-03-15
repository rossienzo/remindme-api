import Joi from 'joi'
import { JoiAdapter } from '../../../../infra/validation/joi.adapter'

export const deleteUserValidationFactory = (): JoiAdapter => {
    const schema = Joi.object({
        id: Joi.string().required()
    })
    return new JoiAdapter(schema)
}
