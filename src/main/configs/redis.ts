import Redis from 'ioredis'

const redis = new Redis()

const connect = async () => redis.connect()

const getClient = () => redis

export default {
    connect,
    getClient
}