import { Response } from "express"

export class AppError extends Error {

    statusCode : number

    constructor(statusCode: number = 400, message: string) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}
        