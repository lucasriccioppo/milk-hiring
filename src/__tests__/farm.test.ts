import dotenv from "dotenv"
dotenv.config({ path: `${__dirname}/.test.env` })
import request from 'supertest'
import app from '../main/server'
import database from '../main/configs/database'
import { User } from '../main/models/user'
import { Farm } from '../main/models/farm'
import HttpStatus from 'http-status-codes'
import userData from './data/user'
import UserService from "../main/services/userService"

const BASE_URL = '/api/farm'

let farmerToken: string
let userId: string

describe('Farm tests', () => {
    beforeAll(async () => {
        await database.connect()
        const userInserted = await database.insert(User, userData)
        userId = userInserted.insertedId.toString()

        const authorization = await UserService.login('test@test.com', 'teste123')
        farmerToken = authorization.token
    })

    afterAll(async () => {
        await database.deleteAll(Farm)
        await database.deleteAll(User)
        await database.close()
    })

    it('Should create a farm for logged user successfully', async() => {
        const res = await request(app)
            .post(BASE_URL)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send({
                name: 'Test Farm',
                distance: 150
            })

        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        expect(res.body.name).toEqual('Test Farm')
        expect(res.body.owner).toEqual(userId)
    })

    it('Should fail trying to create a farm for the logged user with farm already created', async() => {
        const res = await request(app)
            .post(BASE_URL)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send({
                name: 'Test Farm 2',
                distance: 200
            })
        
            expect(res.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY)
            expect(res.body.description).toEqual('Farm for this farmer already exists')
    })
})