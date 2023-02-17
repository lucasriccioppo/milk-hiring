import { Request, Response, NextFunction } from 'express'
import HttpStatus from 'http-status-codes'
import FarmService from '../services/farmService'

/**
 * @swagger
 * /api/farm:
 *   post:
 *     description: Create a new farm
 *     tags: ['Farm']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: name
 *         description: Name of the farm
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - distance
 *           properties:
 *             name:
 *               type: string
 *               example: Fazenda BovControl
 *             distance:
 *               type: number
 *               example: 100
 *     responses:
 *       '201':
 *         description: A successful response
 *       '422':
 *         description: Unprocessable Entity
 */
const createFarm = async (req: Request, res: Response, next: NextFunction) => {
    const { name, distance } = req.body

    try {
        const owner = req.context.userId
        const createdFarm = await FarmService.createFarm({ name, owner, distance })
        return res.status(HttpStatus.CREATED).json(createdFarm)
    } catch(err) {
        next(err)
    }
}

export default {
    createFarm
}