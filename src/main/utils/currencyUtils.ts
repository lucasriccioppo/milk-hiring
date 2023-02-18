import get from 'lodash/get'
import CurrencyServices from '../services/currencyService'

const convertBrlToUsd = async (brlValue: number) => {
    const currencies = await CurrencyServices.getCurrencies()
    const brlToUsdRate = get(currencies, 'BRL', 1)

    return brlValue / brlToUsdRate
}

export default {
    convertBrlToUsd
}
