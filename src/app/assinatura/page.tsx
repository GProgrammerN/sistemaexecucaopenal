"use client";
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios"
import Layout from '@/components/template/Layout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const handleSubscription = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/mensal',
      {
        priceId: 'price.id'
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data)
  }

  const handleSubscriptionSemestral = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/semestral',
      {
        priceId: 'price.id'
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data)
  }

  const handleSubscriptionAnual = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/anual',
      {
        priceId: 'price.id'
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data)
  }

  return (
    <Layout titulo='Gerenciar suas Assinaturas' subtitulo='Gerencie seu plano.'>
      <form method="POST">
        <section>
          <div className='flex'>
            <p className='mr-4'>Assinatura Mensal</p>
            <button className='flex-shrink-1 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded'
              type="submit" role="link" onClick={handleSubscription}>
              Assinar
            </button>
          </div>
          <div className='flex'>
            <p className='mr-4'>Assinatura Semestral</p>
            <button className='flex-shrink-1 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded'
              type="submit" role="link" onClick={handleSubscriptionSemestral}>
              Assinar
            </button>
          </div>
          <div className='flex'>
            <p className='mr-4'>Assinatura Anual</p>
            <button className='flex-shrink-1 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded'
              type="submit" role="link" onClick={handleSubscriptionAnual}>
              Assinar
            </button>
          </div>
        </section>
        <button className="flex-shrink-1 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button" onClick={() => { window.open('https://billing.stripe.com/p/login/test_14k4jA29h2zV8lqbII') }}>Gerenciar Assinatura</button>
      </form>
    </Layout>
  );
}