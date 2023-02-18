import * as Yup from 'yup'

const createFarmer = Yup.object().shape({
    first_name: Yup.string().min(2).max(20).required(),
    last_name: Yup.string().min(2).max(60).required(),
    email: Yup.string().email().min(5).max(40).required(),
    password: Yup.string().min(6).max(20).required()
})

const login = Yup.object().shape({
    email: Yup.string().email().min(5).max(40).required(),
    password: Yup.string().min(6).max(20).required()
})

export default {
    createFarmer,
    login
}