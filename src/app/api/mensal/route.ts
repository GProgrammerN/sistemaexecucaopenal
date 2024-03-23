import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextApiRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1OwmTFDJ0RG7mjZbpMsWHt8w',
        quantity: 1,
      }
    ],
    mode: 'subscription',
//    success_url: `http://localhost:3000/assinatura/?success1=true`,
    success_url: `https://sistemaexecucaopenal.vercel.app/assinatura/?success1=true`,
    cancel_url:  `https://sistemaexecucaopenal.vercel.app/assinatura/?canceled=true`,
  })
  
  return NextResponse.json(session.url)
}
