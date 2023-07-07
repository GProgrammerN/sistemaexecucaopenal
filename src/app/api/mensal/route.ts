import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextApiRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1NMeUDDJ0RG7mjZbVxS6I010',
        quantity: 1,
      }
    ],
    mode: 'subscription',
    success_url: `http://localhost:3000/assinatura/?success=true`,
    cancel_url:  `http://localhost:3000/assinatura/?canceled=true`,
  })

  return NextResponse.json(session.url)
}
