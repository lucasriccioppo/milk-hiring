import FreeCurrencyApi from '../integrations/freeCurrencyApi'
import redisUtils from '../utils/redisUtils'

const CurrencyService = {
    async getCurrencies() {
        const currenciesInRedis = await redisUtils.getKey('currencies')

        if(!currenciesInRedis) {
            const currenciesInApi = await FreeCurrencyApi.getCurrencies()

            await redisUtils.setKey('currencies', JSON.stringify(currenciesInApi))

            return currenciesInApi
        }

        return JSON.parse(currenciesInRedis)
    }
}

export default CurrencyService