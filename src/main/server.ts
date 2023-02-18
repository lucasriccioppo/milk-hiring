import express from 'express'
import addMiddlewares from './configs/middleware'

const app = express()

addMiddlewares(app)

export default app