import * as Yup from 'yup'

const createFarm = Yup.object({
    name: Yup.string().min(2).max(80).required(),
    distance: Yup.number().required()
})

export default {
    createFarm
}