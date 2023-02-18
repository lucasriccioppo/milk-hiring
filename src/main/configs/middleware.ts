import express from 'express'
import router from '../routes/routes'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import errorHandler from './errorHandler'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerOptions from './swaggerOptions'
import middlewareUtils from '../utils/middlewareUtils'

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const addMiddlewares = (app: express.Application) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use(compression())
    app.use(morgan('combined'))

    app.use(middlewareUtils.getContext)

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    app.use('/api', router)

    app.use(errorHandler)
}

export default addMiddlewares