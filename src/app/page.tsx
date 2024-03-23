"use client";
import Layout from "@/components/template/Layout";
import { useState } from "react";
import firebase from "../firebase/config";
import Cookies from "js-cookie";
import { differenceInDays } from "date-fns";

export default function Home() {
  const [xdataprisao, setDataprisao] = useState("//");
  const [xdataprogressao, setDataprogressao] = useState("//");
  const [xdatacondicional, setDatacondicional] = useState("//");
  const [xdatafim, setDatafim] = useState("//");

  const [xtipocrime, setTipocrime] = useState("");
  const [xprirei, setPrirei] = useState("");
  const [xdiasPena, setDiasPena] = useState("");
  const [xmesesPena, setMesesPena] = useState("");
  const [xanosPena, setAnosPena] = useState("");

  const [xqtdREMI, setQtdREMI] = useState("");
  const [xqtdTRAB, setQtdTRAB] = useState("");
  const [xqtdESTU, setQtdESTU] = useState("");

  const db = firebase.firestore();

  var id = firebase.auth().currentUser?.uid;

  if (Cookies.get("bloqueio")) {
    window.location.assign("/assinatura");
  }

  function formatDate(Ref: Date) {
    var d = new Date(Ref),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function calculardatas() {
    var remissao = 0;
    var dataf = new Date(xdataprisao);
    if (parseInt(xanosPena) > 0) {
      dataf.setDate(dataf.getDate() + parseInt(xanosPena) * 365);
    }
    if (parseInt(xmesesPena) > 0) {
      dataf.setDate(dataf.getDate() + parseInt(xmesesPena) * 30);
    }
    if (parseInt(xdiasPena) > 0) {
      dataf.setDate(dataf.getDate() + parseInt(xdiasPena));
    }
    if (parseInt(xqtdREMI) > 0) {
      remissao = remissao + parseInt(xqtdREMI);
    }
    if (parseInt(xqtdESTU) > 0) {
      remissao = remissao + parseInt(xqtdESTU) / 12;
    }
    if (parseInt(xqtdTRAB) > 0) {
      remissao = remissao + parseInt(xqtdTRAB) / 3;
    }

    dataf.setDate(dataf.getDate() - remissao + 1);
    var x = formatDate(dataf);
    x = x.toString();
    setDatafim(x);

    var xdatal = new Date(xdataprisao);
    var xdataini = new Date(xdataprisao);
    var xdatap = new Date(xdataprisao);
    var d1 = 0;
    var calculap = 0;
    var calculal = 0;

    d1 = differenceInDays(dataf, xdataini);

    if (xtipocrime == "1") {
      if (xprirei == "1") {
        calculal = (d1 / 3) * 1;
        calculap = (d1 * 16) / 100;
      } else {
        calculal = (d1 / 2) * 1;
        calculap = (d1 * 20) / 100;
      }
    }
    if (xtipocrime == "2") {
      if (xprirei == "1") {
        calculal = (d1 / 3) * 1;
        calculap = (d1 * 25) / 100;
      } else {
        calculal = (d1 / 2) * 1;
        calculap = (d1 * 30) / 100;
      }
    }
    if (xtipocrime == "3") {
      if (xprirei == "1") {
        calculal = (d1 * 2) / 3;
        calculap = (d1 * 40) / 100;
      } else {
        calculal = d1;
        calculap = (d1 * 60) / 100;
      }
    }
    if (xtipocrime == "4") {
      calculal = d1;
      if (xprirei == "1") {
        calculap = (d1 * 50) / 100;
      } else {
        calculap = (d1 * 70) / 100;
      }
    }
    if (xtipocrime == "5") {
      calculap = (d1 * 1) / 6;
      if (xprirei == "1") {
        calculal = (d1 / 3) * 1;
      } else {
        calculal = (d1 / 2) * 1;
      }
    }
    if (xtipocrime == "6") {
      if (xprirei == "1") {
        calculal = (d1 / 3) * 1;
        calculap = (d1 * 2) / 5;
      } else {
        calculal = (d1 / 2) * 1;
        calculap = (d1 * 3) / 5;
      }
    }
    if (xtipocrime == "7") {
      calculal = (d1 / 3) * 2;
      calculap = (d1 * 1) / 6;
    }
    if (xtipocrime == "8" || xtipocrime == "9") {
      calculap = (d1 * 50) / 100;
      if (xprirei == "1") {
        calculal = (d1 / 3) * 2;
      } else {
        calculal = d1;
      }
    }
    if (xtipocrime == "10") {
      calculap = (d1 * 1) / 8;
      if (xprirei == "1") {
        calculal = (d1 / 3) * 1;
      } else {
        calculal = (d1 / 2) * 1;
      }
    }
    xdatal.setDate(xdatal.getDate() + calculal + 1 - remissao);
    xdatap.setDate(xdatap.getDate() + calculap + 1 - remissao);
    //    xdatal.setDate(xdatal.getDate() + 1 - remissao);
    //    xdatap.setDate(xdatap.getDate() + 1 - remissao);
    var z = formatDate(xdatal);
    var y = formatDate(xdatap);
    z = z.toString();
    y = y.toString();
    setDatacondicional(z);
    setDataprogressao(y);
    //    alert(z + ' ' + y)
  }

  return (
    <Layout
      titulo="Sistema de Controle de Execução Penal"
      subtitulo="Calculadora de Execução Simples"
      tipoHeight="h-full lg:h-screen"
    >
      <h3>CALCULADORA DE EXECUÇÃO PENAL SIMPLIFICADA</h3>
      <main className="flex justify-center items-center">
        <form
          className="mt-2 mr-1 flex flex-col border-2 rounded w-200">
          <div className="flex flex-col flex-wrap items-center p-1 dark:text-white text-black justify-between">
            <label className="mt-1 sm:mt-0">
              Data da Prisão:
              <input
                className="block dark:bg-gray-400 w-auto"
                type="date"
                value={xdataprisao}
                placeholder="Data da prisão"
                onChange={(event) => setDataprisao(event.target.value)}
              />
            </label>
            <label>
              Tipo de Crime
              <select
                className="block  dark:bg-gray-400 w-full"
                value={xtipocrime}
                name="crimes"
                id="crimes"
                onChange={(event) => setTipocrime(event.target.value)}
              >
                <option value="0">Selecione o tipo de crime</option>
                <option value="1">
                  Crime não hediondo posterior a Lei 13.964, sem violencia ou
                  grave ameaça a pessoa. 1
                </option>
                <option value="2">
                  Crime não hediondo posterior a Lei 13.964, com violencia ou
                  grave ameaça a pessoa. 2
                </option>
                <option value="3">
                  Crime hediondo ou equiparado, posterior a Lei 13.964, tendo ou
                  não violencia ou grave ameaça a pessoa. 3
                </option>
                <option value="4">
                  Crime hediondo ou equiparado, posterior a Lei 13.964, com
                  resultado morte. 4
                </option>
                <option value="5">
                  Crime não hediondo ou equiparado anterior a Lei 13.964. 5
                </option>
                <option value="6">
                  Crime hediondo ou equiparado anterior a Lei 13.964 e posterior
                  a Lei 11.464/07. 6
                </option>
                <option value="7">
                  Crime hediondo ou equiparado anterior a Lei 11.464/07. 7
                </option>
                <option value="8">
                  Exercer comando de organização criminosa para prática de crime
                  hediondo. 8
                </option>
                <option value="9">
                  Crime de constituição de milícia privada. 9
                </option>
                <option value="10">
                  Art. 112 §3º LEP 1/8 Mulheres gestantes ou responsáveis. 10
                </option>
              </select>
            </label>
            <label>
              Situação
              <select
                className="block dark:bg-gray-400"
                value={xprirei}
                name="reincidencia"
                id="reincidencia"
                onChange={(event) => setPrirei(event.target.value)}
              >
                <option value="0">Selecione</option>
                <option value="1">Primário</option>
                <option value="2">Reincidente</option>
              </select>
            </label>
            <label className="mt-2">CONDENAÇÃO</label>
            <div className="flex flex-row space-x-3">
              <label>
                Qt.Anos
                <input
                  className="block w-16 dark:bg-gray-400 dark:placeholder-white"
                  type="number"
                  value={xanosPena}
                  placeholder="Anos"
                  onChange={(event) => setAnosPena(event.target.value)}
                />
              </label>
              <label>
                Qt.Meses
                <input
                  className="block w-16 dark:bg-gray-400 dark:placeholder-white"
                  type="number"
                  value={xmesesPena}
                  placeholder="Meses"
                  onChange={(event) => setMesesPena(event.target.value)}
                />
              </label>
              <label>
                Qt.Dias
                <input
                  className="block w-16 dark:bg-gray-400 dark:placeholder-white"
                  type="number"
                  value={xdiasPena}
                  placeholder="Dias"
                  onChange={(event) => setDiasPena(event.target.value)}
                />
              </label>
            </div>
            <label className="mt-2">DETRAÇÃO / REMIÇÃO</label>
            <div className="flex flex-row space-x-3">
              <label>
                Detração
                <input
                  className="block w-16 dark:bg-gray-400 dark:placeholder-white"
                  type="number"
                  value={xqtdREMI}
                  placeholder="Dias"
                  onChange={(event) => setQtdREMI(event.target.value)}
                />
              </label>
              <label>
                Estudos
                <input
                  className="block w-16 dark:bg-gray-400 dark:placeholder-white"
                  type="number"
                  value={xqtdESTU}
                  placeholder="Horas"
                  onChange={(event) => setQtdESTU(event.target.value)}
                />
              </label>
              <label>
                Trabalho
                <input
                  className="block w-16 dark:bg-gray-400 dark:placeholder-white"
                  type="number"
                  value={xqtdTRAB}
                  placeholder="Dias"
                  onChange={(event) => setQtdTRAB(event.target.value)}
                />
              </label>
            </div>
            <label className="mt-2">DATAS</label>
            <div className="flex flex-row space-x-3">
              <label className="mt-1 sm:mt-0">
                Progressão:
                <input
                  className="block dark:bg-gray-400 w-auto"
                  type="date"
                  value={xdataprogressao}
                  placeholder="Data da progressão"
                  onChange={(event) => setDataprogressao(event.target.value)}
                />
              </label>
              <label className="mt-1 sm:mt-0">
                Condicional:
                <input
                  readOnly
                  className="block dark:bg-gray-400 w-auto"
                  type="date"
                  value={xdatacondicional}
                  placeholder="Data da condicional"
                  onChange={(event) => setDatacondicional(event.target.value)}
                />
              </label>
              <label className="mt-1 sm:mt-0">
                Término:
                <input
                  readOnly
                  className="block dark:bg-gray-400 w-auto"
                  type="date"
                  value={xdatafim}
                  placeholder="Data fim da pena"
                  onChange={(event) => setDatafim(event.target.value)}
                />
              </label>
            </div>
          </div>
        </form>
      </main>
      <div className="flex justify-center">
        <button
          className="cursor-pointer ml-3 w-32 mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded"
          onClick={calculardatas}
        >
          CALCULAR
        </button>
      </div>
    </Layout>
  );
}
