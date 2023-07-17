"use client";
import React from 'react';
import axios from "axios"
import Layout from '@/components/template/Layout';
import cookies from "js-cookie"
import AssinaturaOpcoes from '@/components/template/AssinaturaOpcoes';

export default function PreviewPage() {

  if (typeof window !== "undefined") {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      if (!cookies.get('assinatura')) {
        let xid = cookies.set('assinatura', 'true')
      }
      if (cookies.get('bloqueio')) {
        cookies.remove('bloqueio')
      }
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

    if (typeof window !== "undefined") {
      window.location.assign(data)
    }
  }

  function cancelar() {
    if (typeof window !== "undefined") {
      window.open('https://billing.stripe.com/p/login/test_14k4jA29h2zV8lqbII')
    }
  }

  return (
    <Layout titulo='Gerenciamento de Assinatura' subtitulo='Assinatura / Cancelamento'>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <form method="POST">
        <div className="flex justify-center items-center">
          <div className="hidden mt-4
            lg:flex flex-row">
            <div className="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl">
              <h1 className="text-black font-semibold text-2xl">Mensal</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">R$ </span>
                <span className="text-3xl font-semibold text-black">30</span>
                <span className="text-gray-400 font-medium">/mês</span>
              </p>
              <hr className="mt-4 border-1" />
              <div className="pt-8">
                <p className="font-semibold text-gray-400 text-left">
                  <span className="material-icons align-middle">
                    done
                  </span>
                  <span className="pl-2">
                    <span className="text-black">Acesso ao Sistema de Execução Penal</span>
                  </span>
                </p>
                <p className="font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">
                    done
                  </span>
                  <span className="pl-2">
                    <span className="text-black">Suporte Garantido</span>
                  </span>
                </p>
                <a href="#" className="">
                  <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                    <button type="submit" className="font-medium" onClick={handleSubscription}>
                      Assinar Plano
                    </button>
                    <span className="pl-2 material-icons align-middle text-sm">
                      east
                    </span>
                  </p>
                </a>
              </div>
            </div>

            <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
              <h1 className="text-white font-semibold text-2xl">Semestral</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">R$ </span>
                <span className="text-3xl font-semibold">150</span>
                <span className="text-gray-400 font-medium">/semestre</span>
              </p>
              <hr className="mt-4 border-1 border-gray-600" />
              <div className="pt-8">
                <p className="font-semibold text-gray-400 text-left">
                  <span className="material-icons align-middle">
                    done
                  </span>
                  <span className="pl-2">
                    <span className="text-white">Acesso ao Sistema de Execução Penal</span>
                  </span>
                </p>
                <p className="font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">
                    done
                  </span>
                  <span className="pl-2">
                    <span className="text-white">Suporte Garantido</span>
                  </span>
                </p>
                <a href="#" className="">
                  <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                    <button type="submit" className="font-medium" onClick={handleSubscriptionSemestral}>
                      Assinar Plano
                    </button>
                    <span className="pl-2 material-icons align-middle text-sm">
                      east
                    </span>
                  </p>
                </a>
              </div>
              <div className="relative top-4">
                <p className="bg-green-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">17% de Desconto</p>
              </div>

            </div>

            <div className="w-96 p-8 bg-white text-center rounded-3xl pl-16 shadow-xl">
              <h1 className="text-black font-semibold text-2xl">Anual</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">R$ </span>
                <span className="text-3xl text-black font-semibold">240</span>
                <span className="text-gray-400 font-medium">/ano</span>
              </p>
              <hr className="mt-4 border-1" />
              <div className="pt-8">
                <a href="#" className="">
                  <p className="font-semibold text-gray-400 text-left">
                    <span className="material-icons align-middle">
                      done
                    </span>
                    <span className="pl-2">
                      <span className="text-black">Acesso ao Sistema de Execução Penal</span>
                    </span>
                  </p>
                  <p className="font-semibold text-gray-400 text-left pt-5">
                    <span className="material-icons align-middle">
                      done
                    </span>
                    <span className="pl-2">
                      <span className="text-black">Suporte Garantido</span>
                    </span>
                  </p>
                  <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                    <button type="submit" className="font-medium" onClick={handleSubscriptionAnual}>
                      Assinar Plano
                    </button>
                    <span className="pl-2 material-icons align-middle text-sm">
                      east
                    </span>
                  </p>
                </a>
              </div>
              <div className="relative top-4">
                <p className="bg-green-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">33% de Desconto</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex align-center
        lg:justify-center'>
          <button className="
          bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700
          flex-shrink-1 w-auto text-sm border-4 text-white py-1 px-2 rounded
          lg:mt-16"
            type="button" onClick={cancelar}>Gerencie sua Assinatura</button>
        </div>
      </form>
    </Layout>
  );
}