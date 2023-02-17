import { object, string, number } from 'yup'

const createCurrency = object().shape({
  name: string().min(2).max(30).required(),
  value: number().required()
})

const removeCurrencyById = object().shape({
  id: number().required()
})

const findCurrencies = object().shape({})

const convertCurrency = object().shape({
  from: string().min(2).required(),
  to: string().min(2).required(),
  amount: number().required()
})

const findCurrencyByName = object().shape({
  name: string().required()
})

const updateCurrency = object().shape({
  id: number().required(),
  value: number().required()
})

export default {
  createCurrency,
  removeCurrencyById,
  findCurrencies,
  findCurrencyByName,
  convertCurrency,
  updateCurrency
}