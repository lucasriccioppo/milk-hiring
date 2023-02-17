import axios from 'axios'
import {IFreeCurrencyApi} from './types/IFreeCurrencyApi'

const {
    CURRENCY_API_KEY,
    CURRENCY_API_URL
} = process.env

const FreeCurrencyApi: IFreeCurrencyApi = {
    async getCurrencies() {
        const response = await axios.get(`${CURRENCY_API_URL}/latest?apikey=${CURRENCY_API_KEY}`)

        return Promise.resolve(response.data.data)
    }
}

export default FreeCurrencyApi