import aj from "../config/arcjet.js";
import { StatusCodes } from "http-status-codes";

const arcjetMiddleware = async (req, res, next ) => {
  try {
    const decision = await aj.protect(req, { requested: 1 })
    if(decision.isDenied()) {
      if(decision.reason.isRateLimit()) return res.status(StatusCodes.TOO_MANY_REQUESTS).json({ error: 'Rate limited exceeded'})

      if(decision.reason.isBot()) return res.status(StatusCodes.FORBIDDEN).json({ error: 'Bot detected' })

      return res.status(StatusCodes.FORBIDDEN).json({ error: "Access denied "})

    }

    next()
  } catch(error) {
    console.log(`Arcjet Middle ware error : ${error}`);
    next(error);
  }
}

export default arcjetMiddleware