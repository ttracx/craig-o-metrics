import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    maxMetrics: 3,
    features: ['3 metrics', 'Basic charts', '30-day history'],
  },
  pro: {
    name: 'Pro',
    price: 14,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    maxMetrics: Infinity,
    features: ['Unlimited metrics', 'Advanced charts', 'Unlimited history', 'Weekly email reports', 'Stripe integration'],
  },
}
