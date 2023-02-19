import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm'
import { Farm } from '../models/farm'
import { User } from '../models/user'
import { Production } from '../models/production'

const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
} = process.env

const envDbPortValue = parseInt(DB_PORT || '')
const PORT : number = Number.isInteger(envDbPortValue) ? envDbPortValue : 27017

const dataSource = new DataSource({
    type: 'mongodb',
    host: DB_HOST,
    port: PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [Farm, Production, User],
    useUnifiedTopology: true,
    authSource: 'admin',
    synchronize: false,
    logging: true
})

const getDataSource = () => dataSource

const connect = async () => await dataSource.initialize()

const close = async () => await dataSource.destroy()

const insert = async (collection: EntityTarget<ObjectLiteral>, document: object) => 
    await dataSource.getMongoRepository(collection).insertOne(document)

const deleteAll = async (collection: EntityTarget<ObjectLiteral>) =>
    await dataSource.getMongoRepository(collection).deleteMany({})

export default {
    getDataSource,
    connect,
    close,
    insert,
    deleteAll
}