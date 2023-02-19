import dotenv from "dotenv"
dotenv.config({ path: `${__dirname}/.test.env` })
import request from 'supertest'
import app from '../main/server'
import database from '../main/configs/database'
import { User } from '../main/models/user'
import HttpStatus from 'http-status-codes'

const BASE_URL = '/api/user'

const userData = {
    email: 'test@test.com',
    first_name: 'Test',
    last_name: 'Testando',
    password: 'teste123'
}

describe('User tests', () => {
    beforeAll(async () => {
        await database.connect()
    })

    afterAll(async () => {
        await database.deleteAll(User)
        await database.close()
    })

    it('Should create user farmer successfully', async() => {
        const res = await request(app)
            .post(BASE_URL)
            .send(userData)

        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        expect(res.body.email).toEqual('test@test.com')
        expect(res.body.type).toEqual('FARMER')
    })

    it('Should fail trying to create new user with email already registered', async() => {
        const res = await request(app)
            .post(BASE_URL)
            .send(userData)
        
            expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST)
            expect(res.body.description).toEqual('Email already exists on database')
    })

    it('Should login in the application successfully', async() => {
        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send({
                email: userData.email,
                password: userData.password
            })

        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(res.body).toHaveProperty('token')
    })

    it('Should fail trying to login in the application', async() => {
        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send({
                email: 'anymail@mail.com',
                password: 'testtest'
            })

        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
        expect(res.body.description).toEqual('Email already exists on database')
        expect(res.body).toHaveProperty('token')
    })
})