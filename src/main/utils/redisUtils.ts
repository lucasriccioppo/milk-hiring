import redis from '../configs/redis'

const redisClient = redis.getClient()

const RedisUtils = {
    async getKey(key: string) {
        const valueInRedis = await redisClient.get(key)
        return valueInRedis ? JSON.parse(valueInRedis) : null
    },

    async setKey(key: string, value: string) {
        await redisClient.set(key, JSON.stringify(value), { 'EX': 60 * 5 })
    }
}

export default RedisUtils