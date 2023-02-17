import { Request, Response, NextFunction } from 'express'
import HttpStatus from 'http-status-codes'
import { UserTypes } from '../constants/userTypes'
import UserService from '../services/userService'

/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Create a new farmer / user
 *     tags: ['User']
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
        const createdFarmer = await UserService.createFarmer({ firstName, lastName, email, password, type: UserTypes.FARMER })
        return res.status(HttpStatus.CREATED).json(createdFarmer)
    } catch(err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     description: Log in the user
 *     tags: ['User']
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
 *         description: Bad request
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const token = await UserService.login(email, password)
        return res.status(HttpStatus.OK).json(token)
    } catch(err) {
        next(err)
    }
}

export default {
    createFarmer,
    login
}