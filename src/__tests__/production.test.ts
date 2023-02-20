import dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/.test.env` })
import request from 'supertest'
import app from '../main/server'
import database from '../main/configs/database'
import { User } from '../main/models/user'
import { Farm } from '../main/models/farm'
import { Production } from "../main/models/production"
import HttpStatus from 'http-status-codes'
import testUtils from './utils/testUtils'
import moment from 'moment'
import nock from 'nock'
import currencyApiMockResponse from './utils/currencyApiMockResponse'

const BASE_URL = '/api/production'

let farmerToken: string
let adminToken: string
let farmerId: string
let farmId: string

const now = moment().set({date: 15}) // just to make sure that we can add and subtract days and still be on te same month
const month = now.month() + 1

describe('Production tests', () => {
    beforeAll(async () => {
        await database.connect()

        const farmerUser: User = await testUtils.createDefaultFarmerUser()
        farmerId = farmerUser._id.toString()
        farmerToken = await testUtils.getToken(farmerUser)

        const adminUser: User = await testUtils.createDefaultAdminUser()
        adminToken = await testUtils.getToken(adminUser)

        const farm: Farm = await testUtils.createFarm('Happy Farm', farmerId, 150)
        farmId = farm._id.toString()

        nock(`https://api.freecurrencyapi.com/v1`)
            .persist()
            .get('/latest?apikey=u5ne8urXAUWfbHXjVjvYhxcLbW18tih4pZnCwRLV')
            .reply(HttpStatus.OK, currencyApiMockResponse)
})

    afterAll(async () => {
        await database.deleteAll(Production)
        await database.deleteAll(Farm)
        await database.deleteAll(User)
        await database.close()
    })

    it('Should create production of the day of the farm successfully', async() => {
        const res = await request(app)
            .post(BASE_URL)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send({
                quantity: 20
            })
        
        const date = moment().startOf('day').toDate()

        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        expect(res.body.quantity).toEqual(20)
        expect(res.body.farm).toEqual(farmId)
        expect(new Date(res.body.date)).toEqual(date)
    })

    it('Should fail creating production of the day of the farm', async() => {
        const res = await request(app)
            .post(BASE_URL)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send({
                quantity: 20
            })

            expect(res.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY)
            expect(res.body.description).toEqual('The production of this day had already been registered')
    })

    it('Should get production summary successfully', async() => {
        await database.deleteAll(Production)

        const now = moment()
        const month = now.month() + 1

        await testUtils.createProduction(15, now.startOf('day').toDate(), farmId)
        await testUtils.createProduction(8, now.startOf('day').toDate(), farmId)
        await testUtils.createProduction(7, now.startOf('day').toDate(), farmId)
        
        const res = await request(app)
            .get(`${BASE_URL}/summary/${month}`)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send()

        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(res.body.average).toEqual(10)
        expect(res.body.productions.length).toEqual(3)
    })

    it('Should get production summary with admin user successfully', async() => {
        await database.deleteAll(Production)

        await testUtils.createProduction(15, now.subtract(1, 'day').startOf('day').toDate(), farmId)
        await testUtils.createProduction(8, now.startOf('day').toDate(), farmId)
        await testUtils.createProduction(7, now.startOf('day').toDate(), farmId)
        
        const res = await request(app)
            .get(`${BASE_URL}/summaryByFarm/${farmId}/${month}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send()

        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(res.body.average).toEqual(10)
        expect(res.body.productions.length).toEqual(3)
    })

    it('Should get production month summary successfully', async() => {
        const monthName = moment().set({ month: month - 1 }).format('MMMM')

        await database.deleteAll(Production)

        await testUtils.createProduction(15, now.startOf('day').toDate(), farmId)
        await testUtils.createProduction(8, now.startOf('day').toDate(), farmId)
        await testUtils.createProduction(7, now.startOf('day').toDate(), farmId)

        const res = await request(app)
            .get(`${BASE_URL}/monthSummaryByFarm/${farmId}/${month}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send()

        const responseBrlValue = parseFloat(res.body.brl.replace('R$ ', '').replace(',', '.'))
        const responseUsdValue = parseFloat(res.body.usd.replace('$ ', '').replace(',', '.'))

        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(res.body.month).toEqual(monthName)
        expect(responseBrlValue).toEqual(58.50)
        expect(responseUsdValue).toEqual(11.27)
    })

    it('Should fail trying to get production month summary with farmer token', async() => {
        const res = await request(app)
            .get(`${BASE_URL}/monthSummaryByFarm/${farmId}/${month}`)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send()

        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
        expect(res.body.description).toEqual('Access denied')
    })

    it('Should get production year summary successfully', async() => {
        await database.deleteAll(Production)

        await testUtils.createProduction(15, now.startOf('day').toDate(), farmId)
        await testUtils.createProduction(8, now.startOf('day').toDate(), farmId)
        await testUtils.createProduction(7, now.startOf('day').toDate(), farmId)

        const res = await request(app)
            .get(`${BASE_URL}/yearSummaryByFarm/${farmId}/2023`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send()

        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(res.body.productions.length).toEqual(12)
    })
})