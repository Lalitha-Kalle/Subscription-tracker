import { StatusCodes } from "http-status-codes";

const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };

    error.message = err.message;

    console.error(err);

    if(err.name === 'CastError') {
      const message = 'Resource not found';
      error = new Error(message);
      error.statusCode = StatusCodes.NOT_FOUND;
    }

    if(err.code === 11000) {
      const message = 'Duplicate field value entered';
      error = new Error(message);
      error.statusCode = StatusCodes.BAD_REQUEST;
    }

    if(err.name === "ValidationError") {
      const message = Object.values(err.errors).map(val => val.message)
      error = new Error(message.join(", "))
      error.statusCode = StatusCodes.BAD_REQUEST
    }

    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Server Error",
      data:{},
      error: err.name || {}
    })
  } catch(error) {
    next(error);
  }
}

export default errorMiddleware;