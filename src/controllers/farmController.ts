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
 *           properties:
 *             name:
 *               type: string
 *               example: Fazenda BovControl
 *     responses:
 *       '201':
 *         description: A successful response
 *       '400':
 *         description: Bad Request
 */
const createFarm = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body

    try {
        const owner = req.context.userId
        const createdFarm = await FarmService.createFarm({ name, owner })
        return res.status(HttpStatus.CREATED).json(createdFarm)
    } catch(err) {
        next(err)
    }
}

export default {
    createFarm
}