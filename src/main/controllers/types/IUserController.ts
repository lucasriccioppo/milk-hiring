import { Request, Response, NextFunction } from "express"

export interface IUserController {
    createFarmer: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>
    login: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>
}