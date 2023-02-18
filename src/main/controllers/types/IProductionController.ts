import { Request, Response, NextFunction } from "express"

export interface IProductionController {
    registerProduction: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>
    getProductionSummary: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>
    getProductionSummaryByFarm: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>
    getPaidValueByFarmAndMonth: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>
    getPaidValueByFarmAndYear: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>
}