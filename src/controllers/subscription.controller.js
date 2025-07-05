import { SERVER_URL } from '../config/env.js'
import { workflowClient } from '../config/upstash.js'
import Subscription from '../models/subscription.model.js'
import { StatusCodes } from 'http-status-codes'
export const createSubscription = async (req, res, next) =>{
  try {

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id
    })

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/remainder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })

    res.status(StatusCodes.CREATED).json({ 
      success: true, 
      message: "Successfully subscription created",
      data: { 
        subscription, 
        workflowRunId 
      } 
    })
  } catch (error) {
    next(error);
  }
}

export const getUsersSubscriptions = async (req, res, next) => {
  try {
    if(req.user.id !== req.params.id) {
      const error = new Error("You are not owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({
      user: req.params.id
    });

    res.status(200).json({
      success: true,
      message: 'Get all user subscriptions',
      data: subscriptions,
      err: {}
    })

  } catch (error) {
    next(error);
  }
}

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get all subscriptions',
      data: subscriptions,
      error: {}
    });
  } catch (error) {
    next(error);
  }
};