// import Redis from 'ioredis'

// const redis = new Redis()

// const connect = async () => redis.connect()

// const getClient = () => redis

// export default {
//     connect,
//     getClient
// }

import * as redis from 'redis'

const client = redis.createClient()

const connect = () => client.connect()
    .catch((err) => {
        console.log('Error connecting on redis => ', err)
    })

const getClient = () => client

export default {
    connect,
    getClient
}