"use client";
import React from 'react';
import axios from "axios"
import Layout from '@/components/template/Layout';
import cookies from "js-cookie"

export default function PreviewPage() {

  const query = new URLSearchParams(window.location.search);
  if (query.get('success')) {
    if(!cookies.get('assinatura')){
      let xid = cookies.set('assinatura', 'true')
    }
  }

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
    //window.open(data,'_blank')

    location.assign(data)
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



  const handleSubscriptionemail = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/emails',
      {
        clientId: email
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data)
  }

  function cancelar() {
    handleSubscriptionemail
    //window.open('https://billing.stripe.com/p/login/test_14k4jA29h2zV8lqbII')
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
          type="button" onClick={cancelar}>Gerenciar Assinatura</button>
      </form>
    </Layout>
  );
}