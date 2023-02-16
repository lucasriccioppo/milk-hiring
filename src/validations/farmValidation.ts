import { object, string } from 'yup'

const createFarm = object().shape({
    name: string().min(2).max(80).required()
})

export default {
    createFarm
}