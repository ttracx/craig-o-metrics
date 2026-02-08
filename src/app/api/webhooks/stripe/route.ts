import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Deduplicate events
  const existingEvent = await prisma.stripeEvent.findUnique({
    where: { id: event.id },
  })

  if (existingEvent) {
    return NextResponse.json({ received: true })
  }

  await prisma.stripeEvent.create({
    data: { id: event.id, type: event.type },
  })

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId

        if (userId && session.subscription) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionId: session.subscription as string,
              subscriptionStatus: 'pro',
            },
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        })

        if (user) {
          const status = subscription.status === 'active' ? 'pro' : 'free'
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: status,
            },
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        })

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionId: null,
              subscriptionStatus: 'canceled',
            },
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: invoice.customer as string },
        })

        if (user) {
          // Could send email notification here
          console.log(`Payment failed for user ${user.email}`)
        }
        break
      }
    }

    await prisma.stripeEvent.update({
      where: { id: event.id },
      data: { processed: true },
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
