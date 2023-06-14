'use client';
import Layout from "@/components/template/Layout"
import { useState } from "react"
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
      <form className="w-full">
        <div className="flex flex-row flex-wrap justify-between items-left shadow-lg p-1" >
          <input className='w-2/6' type="text" placeholder="Nome do cliente" onChange={event => setNome(event.target.value)} />
          <input type="text" placeholder="Número de Matricula" onChange={event => setMatricula(event.target.value)} />
          <input type="text" placeholder="Número do Processo" onChange={event => setProcesso(event.target.value)} />
          <input type="text" placeholder="Nome do Presídio" onChange={event => setPresidio(event.target.value)} />
        </div>
        <div className="flex flex-row flex-wrap justify-around items-left shadow-lg m-1">
          <input type="date" placeholder="Data da prisão" onChange={event => setDataprisao(event.target.value)} />
          <input type="date" placeholder="Data da progressão" onChange={event => setDataprogressao(event.target.value)} />
          <input type="date" placeholder="Data da condicional" onChange={event => setDatacondicional(event.target.value)} />
          <input type="date" placeholder="Data fim da pena" onChange={event => setDatafim(event.target.value)} />
        </div>
        <button type="button" onClick={gravar}>GRAVAR</button>
        <button type="button" onClick={receber}>RECEBER</button>
      </form>
    </Layout>
  )
}
