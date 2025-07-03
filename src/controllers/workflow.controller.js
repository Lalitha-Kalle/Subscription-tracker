import { createRequire } from 'module'
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
const require = createRequire(import.meta.url)
const { serve } = require("@upstash/workflow/express")

const REMAINDERS = [7, 5, 2, 1];

export const sendReminders = serve( async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId)

  if(!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);

  if(renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`)
    return;
  }

  for (const daysBefore of REMAINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if(remainderDate.isAfter(dayjs())) {
      await sleepUntilRemainder(context, `Remainder ${daysBefore} days before`);
    }

    await triggerRemainder(context, `Remainder ${daysBefore} days before`)
  }
})

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email')
  })
}

const sleepUntilRemainder = async (context, subscriptionId) => {
  console.log(`Sleeping until ${label} remainder at ${date}`);
  await context.sleepUntil(label, date.toDate());
}

const triggerRemainder = async (context, label) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);
    //sending email
  })
}