type requestContext = {
    farmerId: string
}

declare namespace Express {
    export interface Request {
        context: requestContext
    }
}