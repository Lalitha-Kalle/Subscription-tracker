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

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get all user subscriptions',
      data: subscriptions,
      err: {}
    })

  } catch (error) {
    next(error);
  }
}

export const getAllSubscriptions = async (req, res, next) => {
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

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get subscription by Id',
      data: subscription,
      err: {}
    })
    
  } catch (error) {
    next(error);
  }
};

export const updateSubscriptionById = async (req, res, next) => {
  try {
    const updated = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Subscription updated successfully",
      data: updated,
      err: {}
    })

  } catch (error) {
    next(error);
  }
};

export const deleteSubscriptionById = async (req, res, next) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Subscription deleted Successfully",
      data: {},
      error: {}
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    subscription.status = 'cancelled';
    await subscription.save();

    res.json({
      success: true,
      message: 'Subscription cancelled', 
      data: subscription,
      error: {}
    });
  } catch (error) {
    next(error);
  }
};
