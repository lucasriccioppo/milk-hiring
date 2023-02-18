import { Request, Response, NextFunction } from "express"

export interface IFarmController {
    createFarm: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>
}