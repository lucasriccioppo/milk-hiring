import dotenv from 'dotenv'
dotenv.config()
import app from './server'
import database from './configs/database'
import redis from './configs/redis'

database.connect()
redis.connect()

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))
