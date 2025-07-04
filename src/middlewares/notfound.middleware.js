import { StatusCodes } from "http-status-codes"

export const notFoundMiddleware = (req,res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    data: {},
    error: "NotFound"
  })
}