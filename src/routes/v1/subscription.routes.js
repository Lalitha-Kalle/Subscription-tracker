import { Router } from "express";
import { createSubscription } from "../../controllers/subscription.controller.js";
import authorize from '../../middlewares/auth.middleware.js'

const subscriptionRoutes = Router()

subscriptionRoutes.post("/", authorize, createSubscription)

export default subscriptionRoutes