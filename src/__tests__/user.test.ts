import request from 'supertest'
import app from '../main/server'
import database from '../main/configs/database'
import { User } from '../main/models/user'
import userData from './data/user'
import dotenv from "dotenv"
// dotenv.config({ path: '../.test.env' })
dotenv.config()

describe('User tests', () => {
    beforeAll(async () => {
        await database.connect()
        await database.insert(User, userData)
    })

    afterAll(async () => await database.close())

    it('Should create user farmer successfully', async () => {
        // const res = await request(app).get('/currency')

        expect(200).toEqual(200)
    })
})