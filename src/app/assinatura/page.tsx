"use client";
import React from "react";
import axios from "axios";
import Layout from "@/components/template/Layout";
import cookies from "js-cookie";
import firebase from "../../firebase/config";

export default function PreviewPage() {
  if (typeof window !== "undefined") {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success1")) {
      if (!cookies.get("assinatura")) {
        let xid = cookies.set("assinatura", "1");
      }
      if (cookies.get("bloqueio")) {
        cookies.remove("bloqueio");
      }
    }
    if (query.get("success2")) {
      if (!cookies.get("assinatura")) {
        let xid = cookies.set("assinatura", "2");
      }
      if (cookies.get("bloqueio")) {
        cookies.remove("bloqueio");
      }
    }
    if (query.get("success3")) {
      if (!cookies.get("assinatura")) {
        let xid = cookies.set("assinatura", "3");
      }
      if (cookies.get("bloqueio")) {
        cookies.remove("bloqueio");
      }
    }
  }

  const handleSubscription = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/mensal",
      {
        priceId: "price.id",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    location.assign(data);
  };

  const handleSubscriptionSemestral = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/semestral",
      {
        priceId: "price.id",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };

  const handleSubscriptionAnual = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/anual",
      {
        priceId: "price.id",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (typeof window !== "undefined") {
      window.location.assign(data);
    }
  };

  function formatDate(Ref: Date) {
    var d = new Date(Ref),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

  function cancelar() {
    if (typeof window !== "undefined") {
      let confirma = confirm(
        "Confirma o cancelamento? A operação não pode ser desfeita. E o acesso ao sistema será cancelado ao final do mês corrente."
      );
      if (confirma) {
        const db = firebase.firestore();
        var id = firebase.auth().currentUser?.uid;
        var dataAtual = new Date();
        var dia = 1;
        var mes = (dataAtual.getMonth() + 1);
        var ano = dataAtual.getFullYear();
        var validade = new Date(ano, mes, dia)
        validade.setDate(validade.getDate() - 1)
        var validade2 = formatDate(validade)
        const referencia = db.collection("usuario/").doc(id);
        referencia
          .get()
          .then((doc) => {
            if (doc.exists) {
              db.collection("usuario/").doc(id).update({
                assinatura: "",
                expira: validade2, 
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
        window.open("https://billing.stripe.com/p/login/9AQaFE6cl4Z2036cMM");
      }
    }
  }

  return (
    <Layout
      titulo="Gerenciamento de Assinatura"
      subtitulo="Assinatura / Cancelamento"
      tipoHeight="h-screen sm:h-full lg:h-screen"
    >
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <form method="POST">
        <div className="flex justify-center items-center">
          <div
            className="hidden mt-4
            lg:flex flex-row"
          >
            <div className="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl">
              <h1 className="text-black font-semibold text-2xl">Básico</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">R$ </span>
                <span className="text-3xl font-semibold text-black">10</span>
                <span className="text-gray-400 font-medium">/mês</span>
              </p>
              <hr className="mt-4 border-1" />
              <div className="pt-8">
                <p className="font-semibold text-gray-400 text-left">
                  <span className="material-icons align-middle">done</span>
                  <span className="pl-2">
                    <span className="text-black">
                      Acesso a Calculadora Simplificada de Execução Penal.
                    </span>
                  </span>
                </p>
                <p className="font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">done</span>
                  <span className="pl-2">
                    <span className="text-black">Suporte Garantido</span>
                  </span>
                </p>
                <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                  <button
                    type="submit"
                    className="font-medium"
                    onClick={handleSubscription}
                  >
                    Assinar Plano
                  </button>
                  <span className="pl-2 material-icons align-middle text-sm">
                    east
                  </span>
                </p>
              </div>
            </div>

            <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
              <h1 className="text-white font-semibold text-2xl">
                Intermediário
              </h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">R$ </span>
                <span className="text-3xl font-semibold">30</span>
                <span className="text-gray-400 font-medium">/mês</span>
              </p>
              <hr className="mt-4 border-1 border-gray-600" />
              <div className="pt-8">
                <p className="font-semibold text-gray-400 text-left">
                  <span className="material-icons align-middle">done</span>
                  <span className="pl-2">
                    <span className="text-white">
                      Acesso a Calculadora Simplificada de Execução Penal e ao
                      ChatGPT.
                    </span>
                  </span>
                </p>
                <p className="font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">done</span>
                  <span className="pl-2">
                    <span className="text-white">Suporte Garantido</span>
                  </span>
                </p>
                <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                  <button
                    type="submit"
                    className="font-medium"
                    onClick={handleSubscriptionSemestral}
                  >
                    Assinar Plano
                  </button>
                  <span className="pl-2 material-icons align-middle text-sm">
                    east
                  </span>
                </p>
              </div>
            </div>

            <div className="w-96 p-8 bg-white text-center rounded-3xl pl-16 shadow-xl">
              <h1 className="text-black font-semibold text-2xl">Completo</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">R$ </span>
                <span className="text-3xl text-black font-semibold">50</span>
                <span className="text-gray-400 font-medium">/mês</span>
              </p>
              <hr className="mt-4 border-1" />
              <div className="pt-8">
                <p className="font-semibold text-gray-400 text-left">
                  <span className="material-icons align-middle">done</span>
                  <span className="pl-2">
                    <span className="text-black">
                      Acesso a Calculadora Simplificada de Execução Penal, ao
                      Sistema de Execução Penal e ao ChatGPT.
                    </span>
                  </span>
                </p>
                <p className="font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">done</span>
                  <span className="pl-2">
                    <span className="text-black">Suporte Garantido</span>
                  </span>
                </p>
                <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                  <button
                    type="submit"
                    className="font-medium"
                    onClick={handleSubscriptionAnual}
                  >
                    Assinar Plano
                  </button>
                  <span className="pl-2 material-icons align-middle text-sm">
                    east
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col align-center
        lg:justify-center lg:flex-row"
        >
          <div
            className="flex flex-col text-center mb-5 border-4 text-white
          bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 rounded-md
          lg:hidden"
          >
            <h1 className="font-bold">Assinatura Básica</h1>
            <p>R$10,00/mês</p>
            <button
              className="          
          flex-shrink-1 w-40 self-center text-sm border-4 text-white py-1 px-2 rounded
          my-2"
              type="button"
              onClick={handleSubscription}
            >
              Assinar
            </button>
          </div>
          <div
            className="flex flex-col text-center mb-5 border-4 text-white
          bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 rounded-md
          lg:hidden"
          >
            <h1 className="font-bold">Assinatura Intermediária</h1>
            <p>R$30,00/mês </p>
            <button
              className="          
          flex-shrink-1 w-40 self-center text-sm border-4 text-white py-1 px-2 rounded
          my-2"
              type="button"
              onClick={handleSubscriptionSemestral}
            >
              Assinar
            </button>
          </div>
          <div
            className="flex flex-col text-center mb-5 border-4 text-white
          bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 rounded-md
          lg:hidden"
          >
            <h1 className="font-bold">Assinatura Completa</h1>
            <p>R$50,00/mês </p>
            <button
              className="         
          flex-shrink-1 w-40 self-center text-sm border-4 text-white py-1 px-2 rounded
          my-2"
              type="button"
              onClick={handleSubscriptionAnual}
            >
              Assinar
            </button>
          </div>
          <button
            className="
          bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700
          flex-shrink-1 w-auto text-sm border-4 text-white py-1 px-2 rounded
          lg:mt-16"
            type="button"
            onClick={cancelar}
          >
            Gerencie sua Assinatura
          </button>
        </div>
      </form>
    </Layout>
  );
}
