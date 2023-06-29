import Stripe from 'stripe'
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1NMsTgDJ0RG7mjZbvVe1MyWL',
        quantity: 1,
      }
    ],
    mode: 'subscription',
    success_url: `http://localhost:3000/sucesso/?success=true`,
    cancel_url: `http://localhost:3000/cancela/?canceled=true`,
  })
  return NextResponse.json(session.url)
}
