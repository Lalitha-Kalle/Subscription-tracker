import { Router } from "express";
import { createSubscription, getAllSubscriptions, getSubscriptionById, getUsersSubscriptions } from "../../controllers/subscription.controller.js";
import authorize from '../../middlewares/auth.middleware.js'

const subscriptionRouter = Router()

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.get("/user/:id", authorize, getUsersSubscriptions)

subscriptionRouter.get("/", getAllSubscriptions)

subscriptionRouter.get("/:id", getSubscriptionById)

export default subscriptionRouter