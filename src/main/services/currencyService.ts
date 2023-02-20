import FreeCurrencyApi from '../integrations/freeCurrencyApi'
import redisUtils from '../utils/redisUtils'
import Utils from '../utils/utils'

const CurrencyService = {
    async getCurrencies() {
        const isTest = Utils.isTestEnvironment()
        let currenciesInRedis = isTest ? null : await redisUtils.getKey('currencies')

        if(!currenciesInRedis) {
            const currenciesInApi = await FreeCurrencyApi.getCurrencies()

            isTest ? Promise.resolve() : await redisUtils.setKey('currencies', JSON.stringify(currenciesInApi))

            return currenciesInApi
        }

        return JSON.parse(currenciesInRedis.toString())
    }
}

export default CurrencyService