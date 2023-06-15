'use client';
import Layout from "@/components/template/Layout"
import { useEffect, useState } from "react"
import firebase from '../firebase/config'


export default function Home() {
  const [xnome, setNome] = useState('')
  const [xmatricula, setMatricula] = useState('')
  const [xprocesso, setProcesso] = useState('')
  const [xpresidio, setPresidio] = useState('')
  const [xdataprisao, setDataprisao] = useState('')
  const [xdataprogressao, setDataprogressao] = useState('')
  const [xdatacondicional, setDatacondicional] = useState('')
  const [xdatafim, setDatafim] = useState('')
  const db = firebase.firestore()
  var id = firebase.auth().currentUser?.uid

  useEffect(() => {
    
  })

  function gravar() {

    db.collection('usuario/' + id + '/clientes/').doc(xnome).set({
      nome: xnome,
      matricula: xmatricula,
      processo: xprocesso,
      presidio: xpresidio,
      dataprisao: xdataprisao,
      dataprogressao: xdataprogressao,
      datacondiconal: xdatacondicional,
      datafim: xdatafim
    })
    alert("Cliente cadastrado com sucesso!")
    setNome('')
    setMatricula('')
    setPresidio('')
    setProcesso('')
    setDataprisao('')
    setDataprogressao('')
    setDatacondicional('')
    setDatafim('')
  }

  async function receber() {
    var docRef = await db.collection("usuario/" + id + "/clientes/").where("nome", "!=", "")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          alert()
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        alert("faio")
      });

  }

  return (
    <Layout titulo="Sistema de Controle de Execução Penal" subtitulo="Cadastros de Clientes/Delitos/Remição e Detração">
      <main className="flex justify-center items-center h-full">
        <form className="mr-1 w-full flex border-2">
          <div className="flex flex-row flex-wrap justify-between items-center  p-1" >
            <input className="" type="text" value= {xnome} placeholder="Nome do cliente" onChange={event => setNome(event.target.value)} />
            <input className="" type="text" value= {xpresidio} placeholder="Nome do Presídio" onChange={event => setPresidio(event.target.value)} />
            <input type="text" value= {xmatricula} placeholder="Número de Matricula" onChange={event => setMatricula(event.target.value)} />
            <input type="text" value= {xprocesso} placeholder="Número do Processo" onChange={event => setProcesso(event.target.value)} />
            <input type="date" value= {xdataprisao} placeholder="Data da prisão" onChange={event => setDataprisao(event.target.value)} />
            <input type="date" value= {xdataprogressao} placeholder="Data da progressão" onChange={event => setDataprogressao(event.target.value)} />
            <input type="date" value= {xdatacondicional} placeholder="Data da condicional" onChange={event => setDatacondicional(event.target.value)} />
            <input type="date" value= {xdatafim} placeholder="Data fim da pena" onChange={event => setDatafim(event.target.value)} />
          </div>
          <div className="w-3/6 p-1 bg-blue-300 text-center border-2 ml-1 h-40 overflow-auto">
            <input type="text" placeholder="Buscar" />
            <div className="flex justify-between items-center">
              <p>TESTE DE CLIENTES</p>
              <button type="button" >Seleciona</button>
              <button type="button" >Exclui</button>
            </div>
          </div>
        </form>
      </main>
          <button type="button" onClick={gravar}>GRAVAR </button>
          <button type="button" onClick={receber}> RECEBER</button>
    </Layout>
  )
}
