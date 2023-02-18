import { Request, Response, NextFunction } from 'express'
import HttpStatus from 'http-status-codes'
import ProductionService from '../services/productionService'
import FarmService from '../services/farmService'

/**
 * @swagger
 * /api/production:
 *   post:
 *     description: Register daily milk production
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: production
 *         description: Daily milk production of the farm in liters 
 *         schema:
 *           type: object
 *           required:
 *             - quantity
 *           properties:
 *             quantity:
 *               type: number
 *               example: 50
 *     responses:
 *       '201':
 *         description: A successful response
 *       '404':
 *         description: Not found
 *       '422':
 *         description: Unprocessable Entity
 */
const registerProduction = async (req: Request, res: Response, next: NextFunction) => {
    const { quantity } = req.body

    try {
        const userId = req.context.userId
        const farm = await FarmService.findByUserOrFail(userId)
        const registeredProduction = await ProductionService.registerProduction({ quantity, farm: farm.id.toString() })
        return res.status(HttpStatus.CREATED).json(registeredProduction)
    } catch(err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/production/summary/:month:
 *   get:
 *     description: Get a summary of milk production for the farm of the user logged in
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: month
 *         description: The desired month to get summary. January is 1 and December is 12
 *         required: true
 *         schema:
 *           type: number
 *           example: 5
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Not found
 */
const getProductionSummary = async (req: Request, res: Response, next: NextFunction) => {
    const { month } = req.params

    try {
        const userId = req.context.userId
        const farm = await FarmService.findByUserOrFail(userId)
        const registeredProduction = await ProductionService.getSummary(farm.id.toString(), parseInt(month))
        return res.status(HttpStatus.OK).json(registeredProduction)
    } catch(err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/production/summaryByFarm/:farm/:month:
 *   get:
 *     description: Get a summary of milk production given an farm
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: farm
 *         description: Id of the farm desired
 *         required: true
 *         schema:
 *           type: string
 *           example: 63ef970f791c1336cc40a915
 *       - in: path
 *         name: month
 *         description: The desired month to get summary. January is 1 and December is 12
 *         required: true
 *         schema:
 *           type: number
 *           example: 8
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Not found
 */
const getProductionSummaryByFarm = async (req: Request, res: Response, next: NextFunction) => {
    const { farm, month } = req.params

    try {
        const registeredProduction = await ProductionService.getSummary(farm, parseInt(month))
        return res.status(HttpStatus.OK).json(registeredProduction)
    } catch(err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/production/monthSummaryByFarm/:farm/:month:
 *   get:
 *     description: Get a summary of monthly milk production given an farm
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: farm
 *         description: Id of the farm desired
 *         required: true
 *         schema:
 *           type: string
 *           example: 63ef970f791c1336cc40a915
 *       - in: path
 *         name: month
 *         description: The desired month to get summary. January is 1 and December is 12
 *         required: true
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Not found
 */
const getPaidValueByFarmAndMonth = async (req: Request, res: Response, next: NextFunction) => {
    const { farm, month } = req.params

    try {
        const farmInDatabase = await FarmService.findByIdOrFail(farm)
        const registeredProduction = await ProductionService.getPaidValueByMonth(farm, parseInt(month), farmInDatabase.distance)
        return res.status(HttpStatus.OK).json(registeredProduction)
    } catch(err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/production/yearSummaryByFarm/:farm/:year:
 *   get:
 *     description: Get a summary of yearly milk production given an farm
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: farm
 *         description: Id of the farm desired
 *         required: true
 *         schema:
 *           type: string
 *           example: 63ef970f791c1336cc40a915
 *       - in: path
 *         name: year
 *         description: The desired year to get summary.
 *         required: true
 *         schema:
 *           type: number
 *           example: 2023
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Not found
 */
const getPaidValueByFarmAndYear = async (req: Request, res: Response, next: NextFunction) => {
    const { farm, year } = req.params

    try {
        const farmInDatabase = await FarmService.findByIdOrFail(farm)
        const registeredProduction = await ProductionService.getPaidValueByYear(farm, parseInt(year), farmInDatabase.distance)
        return res.status(HttpStatus.OK).json(registeredProduction)
    } catch(err) {
        next(err)
    }
}

export default {
    registerProduction,
    getProductionSummary,
    getProductionSummaryByFarm,
    getPaidValueByFarmAndMonth,
    getPaidValueByFarmAndYear
}