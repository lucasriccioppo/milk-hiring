type requestContext = {
    userId: string
}

declare namespace Express {
    export interface Request {
        context: requestContext
    }
}