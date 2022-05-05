import { NextFunction, Request, Response } from 'express'

export class HttpException extends Error {
  constructor(public message: string, public status: number) {
    super(message)
  }
}

export const handleErrorMiddleware = (
  err: HttpException | Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err instanceof HttpException ? err.status : 400).json({ error: err.message })

  next(err)
}
