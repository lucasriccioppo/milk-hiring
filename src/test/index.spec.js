const dotenv = require("dotenv")
dotenv.config({ path: '.test.env' })

const database = require('../database')
const request = require('supertest')
const path = require('path')
const fs = require('fs')

const app = require('../server')

describe('Test routes aplication', () => {
  beforeAll(() => database.query(fs.readFileSync(path.resolve(__dirname, 'sql/before-all-test-mass.sql'), 'utf8')))
  afterAll(() => database.query(fs.readFileSync(path.resolve(__dirname, 'sql/after-all-test.sql'), 'utf8')))

  it('should get all currencies', async () => {
    const res = await request(app).get('/currency')
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(5)
  })

  it('should get BRL currency', async () => {
    const res = await request(app).get('/currency/BRL')

    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('BRL')
  })

  it('should fail getting TEST currency', async () => {
    const res = await request(app).get('/currency/TEST')

    expect(res.statusCode).toEqual(404)
  })

  it('should fail creatin BRL currency', async () => {
    const res = await request(app)
      .post('/currency')
      .send({
        name: "BRL",
        value: 10
      })

    expect(res.statusCode).toEqual(400)
    expect(res.body.description).toEqual('Moeda já existente na base')
  })

  let createdCurrencyId
  it('should create TEST currency with value 10', async () => {
    const res = await request(app)
      .post('/currency')
      .send({
        name: "TEST",
        value: 10
      })

    expect(res.statusCode).toEqual(201)
    expect(res.body.name).toEqual('TEST')
    expect(res.body.value).toEqual(10)
    createdCurrencyId = res.body.id
  })

  it('should update TEST currency to value 5', async () => {
    const res = await request(app)
      .put(`/currency/${createdCurrencyId}`)
      .send({ value: 5 })

    expect(res.statusCode).toEqual(200)
    expect(res.body.value).toEqual(5)
  })

  it('should delete TEST currency', async () => {
    const res = await request(app)
      .delete(`/currency/${createdCurrencyId}`)

    expect(res.statusCode).toEqual(200)

    const testCurrency = await request(app).get('/currency/TEST')
    expect(testCurrency.statusCode).toEqual(404)
  })

  it('should convert amount 123.45 of BTC currency to EUR currency', async () => {
    const res = await request(app).post('/currency/convert?from=BTC&to=EUR&amount=123.45')

    expect(res.statusCode).toEqual(200)
    expect(res.body.value).toEqual(3464467.3220338984)
  })
})