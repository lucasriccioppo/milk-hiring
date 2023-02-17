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
 *       '400':
 *         description: Bad request
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
 * /api/production/summary:
 *   get:
 *     description: Get a summary of milk production
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
 *           example: 50
 *     responses:
 *       '200':
 *         description: A successful response
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
 * /api/production/summaryByFarm:
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
 *           example: 50
 *     responses:
 *       '200':
 *         description: A successful response
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

export default {
    registerProduction,
    getProductionSummary,
    getProductionSummaryByFarm
}