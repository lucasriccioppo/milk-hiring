import FreeCurrencyApi from '../integrations/freeCurrencyApi'
import redis from '../configs/redis'

const redisClient = redis.getClient()

const CurrencyService = {
    async getCurrencies() {
        // console.log('entrou aqui')
        // let currencies = await JSON.parse(redisClient.get('currencies').toString())

        // if(!currencies) {
        //     console.log('nao econtrado')
        //     currencies = await FreeCurrencyApi.getCurrencies()

        //     await redisClient.set('currencies', currencies, 'EX', 60 * 60)
        // }

        return FreeCurrencyApi.getCurrencies()
    }
}

export default CurrencyService