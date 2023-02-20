import axios from 'axios'
import FailedDependencyException from '../exceptions/FailedDependencyException'
import { IFreeCurrencyApi } from './types/IFreeCurrencyApi'

const {
    CURRENCY_API_KEY,
    CURRENCY_API_URL
} = process.env

const FreeCurrencyApi: IFreeCurrencyApi = {
    async getCurrencies() {
        try {
            const response = await axios.get(`${CURRENCY_API_URL}/latest?apikey=${CURRENCY_API_KEY}`)
            return Promise.resolve(response.data.data)

        }catch(err) {
            console.log(err)
            throw new FailedDependencyException('Error fetching currencies')
        }
    }
}

export default FreeCurrencyApi