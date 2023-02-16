import { Request, Response, NextFunction } from 'express'
import HttpStatus from 'http-status-codes'
import FarmerService from '../services/farmerService'

/**
 * @swagger
 * /api/farmer:
 *   post:
 *     description: Create a new farmer / user
 *     tags: ['Farmer']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: farmer
 *         description: Farmer object
 *         schema:
 *           type: object
 *           required:
 *             - first_name
 *             - last_name
 *             - email
 *             - password
 *           properties:
 *             first_name:
 *               type: string
 *               example: Lucas
 *             last_name:
 *               type: string
 *               example: Silva
 *             email:
 *               type: string
 *               example: lucassilva@gmail.com
 *             password:
 *               type: string
 *               example: senha123456
 *     responses:
 *       '201':
 *         description: A successful response
 *       '400':
 *         description: Farmer with this email already exists
 */
const createFarmer = async (req: Request, res: Response, next: NextFunction) => {
    const { first_name: firstName, last_name: lastName, email, password } = req.body

    try {
        const createdFarmer = await FarmerService.createFarmer({ firstName, lastName, email, password })
        return res.status(HttpStatus.CREATED).json(createdFarmer)
    } catch(err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/farmer/login:
 *   post:
 *     description: Log in the farmer / user
 *     tags: ['Farmer']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: data
 *         description: Login object
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: lucassilva@gmail.com
 *             password:
 *               type: string
 *               example: senha123456
 *     responses:
 *       '201':
 *         description: A successful response
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Farmer with this email already exists
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const token = await FarmerService.login(email, password)
        return res.status(HttpStatus.OK).json(token)
    } catch(err) {
        next(err)
    }
}

export default {
    createFarmer,
    login
}