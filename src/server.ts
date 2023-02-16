import express from 'express'
import addMiddlewares from './utils/middleware'

const app = express()

addMiddlewares(app)

export default app