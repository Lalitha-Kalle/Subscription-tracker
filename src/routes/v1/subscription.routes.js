import { Router } from "express";
import { createSubscription, deleteSubscriptionById, getAllSubscriptions, getSubscriptionById, getUsersSubscriptions, updateSubscriptionById } from "../../controllers/subscription.controller.js";
import authorize from '../../middlewares/auth.middleware.js'

const subscriptionRouter = Router()

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.get("/user/:id", authorize, getUsersSubscriptions)

subscriptionRouter.get("/", getAllSubscriptions)

subscriptionRouter.get("/:id", getSubscriptionById)

subscriptionRouter.put("/:id", updateSubscriptionById)

subscriptionRouter.delete("/:id", deleteSubscriptionById)

export default subscriptionRouter