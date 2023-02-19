import * as Yup from 'yup'
import SemestersConstants from '../constants/semesterValues'

const registerProduction = Yup.object({
    quantity: Yup.number().required()
})

const getProductionSummary = Yup.object({
    month: Yup.number().oneOf([...SemestersConstants.FIRST_SEMESTER, ...SemestersConstants.SECOND_SEMESTER]).required()
})

const getProductionSummaryByFarm = Yup.object({
    farm: Yup.string().min(20).max(30).required(),
    month: Yup.number().oneOf([...SemestersConstants.FIRST_SEMESTER, ...SemestersConstants.SECOND_SEMESTER]).required()
})

const getPaidValueByFarmAndMonth = Yup.object({
    farm: Yup.string().min(20).max(30).required(),
    month: Yup.number().oneOf([...SemestersConstants.FIRST_SEMESTER, ...SemestersConstants.SECOND_SEMESTER]).required()
})

const getPaidValueByFarmAndYear = Yup.object({
    farm: Yup.string().min(20).max(30).required(),
    year: Yup.number().required()
})

export default {
    registerProduction,
    getProductionSummary,
    getProductionSummaryByFarm,
    getPaidValueByFarmAndMonth,
    getPaidValueByFarmAndYear
}