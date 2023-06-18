'use client';
import Layout from "@/components/template/Layout"
import { FormEvent, useEffect, useState } from "react"
import firebase from '../firebase/config'

import { TbSelect } from "react-icons/tb"
import { TbTrashOff } from "react-icons/tb"

import Select from 'react-select'

const options = [
  { value: "1", label: "Crime não hediondo posterior a Lei 13.964, sem violencia ou grave ameaça a pessoa. 1" },
  { value: "2", label: "Crime não hediondo posterior a Lei 13.964, com violencia ou grave ameaça a pessoa. 2" },
  { value: "4", label: "Crime hediondo ou equiparado, posterior a Lei 13.964, com resultado morte. 4" },
  { value: "5", label: "Crime não hediondo ou equiparado anterior a Lei 13.964. 5" },
  { value: "6", label: "Crime hediondo ou equiparado anterior a Lei 13.964 e posterior a Lei 11.464/07. 6" },
  { value: "7", label: "Crime hediondo ou equiparado anterior a Lei 11.464/07. 7" },
  { value: "8", label: "Exercer comando de organização criminosa para prática de crime hediondo. 8" },
  { value: "9", label: "Crime de constituição de milícia privada. 9" },
  { value: "10", label: "Art. 112 §3º LEP 1/8 Mulheres gestantes ou responsáveis. 10" }
]

const opcao = [
  { value: "1", label: "Primário" },
  { value: "2", label: "Reincidente" }
]

var clientes = [{}]
clientes.shift()

var delitos = [{}]
delitos.shift()

type Cliente = {
  nome: string,
  matricula: string,
  processo: string,
  presidio: string,
  dataprisao: string,
  dataprogressao: string,
  datacondicional: string,
  datafim: string
}

type Delito = {
  descriD: string,
  tipocrime: string,
  prirei: string,
  diasPena: string,
  mesesPena: string,
  anosPena: string
}

export default function Home() {

  // Delitos
  const [xtipocrime, setTipocrime] = useState('')
  const [xprirei, setPrirei] = useState('')
  const [xdescriD, setDescriD] = useState('')
  const [xdiasPena, setDiasPena] = useState('')
  const [xmesesPena, setMesesPena] = useState('')
  const [xanosPena, setAnosPena] = useState('')

  // Clientes

  const [nomeantigo, setNomeantigo] = useState('')
  const [xnome, setNome] = useState('')
  const [xmatricula, setMatricula] = useState('')
  const [xprocesso, setProcesso] = useState('')
  const [xpresidio, setPresidio] = useState('')
  const [xdataprisao, setDataprisao] = useState('//')
  const [xdataprogressao, setDataprogressao] = useState('//')
  const [xdatacondicional, setDatacondicional] = useState('//')
  const [xdatafim, setDatafim] = useState('//')
  const db = firebase.firestore()

  const [status, setStatus] = useState(false)
  const [status2, setStatus2] = useState(false)

  const [atualizando, setAtualizando] = useState(false)
  const [atualizando2, setAtualizando2] = useState(false)
  const [busca, setBusca] = useState<Cliente[]>()

  const [clienta, setClienta] = useState<Cliente[]>()

  const [delita, setDelita] = useState<Delito[]>()

  const [estabuscando, setEstabuscando] = useState(false)

  var id = firebase.auth().currentUser?.uid

  useEffect(() => {
    db.collection("usuario/" + id + "/clientes/").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var x = doc.data()
          clientes.push(x)
        });
        setClienta(clientes)
        clientes = []
      }
      )
    }, [status])

  useEffect(() => {
    db.collection("usuario/" + id + "/clientes/").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var x = doc.data()
          clientes.push(x)
        });
        setClienta(clientes)
        clientes = []
      }
      )
  }, [])

  function buscar(event: FormEvent) {
    const palavra = event.target.value

    console.log(palavra)

    if (palavra != '') {
      setEstabuscando(true)
      const dados = new Array
      clienta?.map(cliente => {
        const regra = new RegExp(event.target.value, "gi")
        if (regra.test(cliente.nome)) {
          dados.push(cliente)
        }
      })
      setBusca(dados)
    } else {
      setEstabuscando(false)
    }
  }

  function deletar(ref: string) {
    if (confirm("Confirma exclusão do cliente?") == true) {
      const referencia = db.collection("usuario/" + id + "/clientes/").doc(ref).delete()
        .then(() => {
          alert("Cliente excluido com sucesso!")
          setStatus(!status)
        }).catch((error) => {
          console.error("Erro ao excluir cliente: ", error);
        }
        )
    }
  }

  function deletardelito(ref: string) {
    if (confirm("Confirma exclusão do cliente?") == true) {
      db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").doc(ref).delete()
        .then(() => {
          alert("Delito excluido com sucesso!")
          setStatus2(!status2)
          db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var y = doc.data()
              delitos.push(y)
            });
            setDelita(delitos)
            delitos = []
          }
          )
        }).catch((error) => {
          console.error("Erro ao excluir Delito: ", error);
        }
        )
    }
  }

  function editardelito(ref: string) {
    setAtualizando2(true)
    setTipocrime(ref.tipocrime)
    setPrirei(ref.prirei)
    setDescriD(ref.descriD)
    setDiasPena(ref.diasPena)
    setMesesPena(ref.mesesPena)
    setAnosPena(ref.anosPena)
    setStatus2(!status2)
  }

  function editar(ref: string) {
    setAtualizando(true)
    setNomeantigo(ref.nome)
    setNome(ref.nome)
    setMatricula(ref.matricula)
    setPresidio(ref.presidio)
    setProcesso(ref.processo)
    setDataprisao(ref.dataprisao)
    setDataprogressao(ref.dataprogressao)
    setDatacondicional(ref.datacondicional)
    setDatafim(ref.datafim)
    
    db.collection("usuario").doc(id).collection("clientes").doc(ref.nome).collection("delitos").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var y = doc.data()
        delitos.push(y)
      });
      setDelita(delitos)
      delitos = []
    }
    )
  }

  function atualizar() {

    db.collection("usuario").doc(id).collection("clientes").doc(nomeantigo).update({
      //      nome: xnome,
      matricula: xmatricula,
      processo: xprocesso,
      presidio: xpresidio,
      dataprisao: xdataprisao,
      dataprogressao: xdataprogressao,
      datacondicional: xdatacondicional,
      datafim: xdatafim
    })
    alert("Cliente atualizado com sucesso!")
    setNome('')
    setMatricula('')
    setPresidio('')
    setProcesso('')
    setDataprisao('')
    setDataprogressao('')
    setDatacondicional('')
    setDatafim('')
    setAtualizando(false)
    setStatus(!status)
  }

  function gravar() {
    if (xnome != '') {
      db.collection('usuario/' + id + '/clientes/').doc(xnome).set({
        nome: xnome,
        matricula: xmatricula,
        processo: xprocesso,
        presidio: xpresidio,
        dataprisao: xdataprisao,
        dataprogressao: xdataprogressao,
        datacondicional: xdatacondicional,
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
      setStatus(!status)
    } else {
      alert("Não é possivel gravar clientes sem preencher o nome!")
    }
  }

  function gravardelito() {

    db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").doc(xdescriD).set({
      descriD: xdescriD,
      tipocrime: xtipocrime,
      prirei: xprirei,
      diasPena: xdiasPena,
      mesesPena: xmesesPena,
      anosPena: xanosPena
    })
    alert("Delito cadastrado com sucesso!")
    setDescriD('')
    setTipocrime('')
    setPrirei('')
    setDiasPena('')
    setMesesPena('')
    setAnosPena('')
    setStatus(!status)

    db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var y = doc.data()
        delitos.push(y)
      });
      setDelita(delitos)
      delitos = []
    }
    )

  }

  function atualizardelito() {

    db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").doc(xdescriD).update({
//      descriD: xdescriD,
      tipocrime: xtipocrime,
      prirei: xprirei,
      diasPena: xdiasPena,
      mesesPena: xmesesPena,
      anosPena: xanosPena
    })
    alert("Delito atualizado com sucesso!")
    setDescriD('')
    setTipocrime('')
    setPrirei('')
    setDiasPena('')
    setMesesPena('')
    setAnosPena('')
    setStatus(!status2)
    setAtualizando2(atualizando2)


    db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var y = doc.data()
        delitos.push(y)
      });
      setDelita(delitos)
      delitos = []
    }
    )
  }


  return (

    <Layout titulo="Sistema de Controle de Execução Penal" subtitulo="Cadastros de Clientes/Delitos/Remição e Detração">
      <h1 className="">Cadastro de Clientes</h1>
      <main className="flex justify-center items-center">
        <form className="mr-1 w-full flex border-2">
          <div className="w-3/6 p-1 flex flex-col">
            <div className="flex flex-col justify-between items-left">
              <input type="text" placeholder="Buscar" onChange={buscar} />
            </div>
            <div className=" bg-blue-300 text-center border-2 ml-1 h-20 overflow-auto">
              {estabuscando ?
                busca?.map(cli => {
                  return (
                    <div key={cli.nome} className="flex justify-start text-sm">
                      <a className="text-right cursor-pointer" onClick={() => editar(cli)}>
                        <TbSelect />
                      </a>
                      <a className="text-right cursor-pointer" onClick={() => deletar(cli.nome)}>
                        <TbTrashOff />
                      </a>
                      <p className="text-left">{cli.nome}</p>
                    </div>
                  )
                })
                :
                clienta?.map(cli => {
                  return (
                    <div className="flex justify-start text-sm">
                      <a className="text-right cursor-pointer" onClick={() => editar(cli)}>
                        <TbSelect />
                      </a>
                      <a className="text-right cursor-pointer" onClick={() => deletar(cli.nome)}>
                        <TbTrashOff />
                      </a>
                      <p className="text-left">{cli.nome}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-between items-center  p-1" >
            <label >NOME:
              <input required className="block" type="text" value={xnome} placeholder="Nome do cliente" onChange={event => setNome(event.target.value)} />
            </label>
            <label>MATRICULA:
              <input required className='block' type="text" value={xmatricula} placeholder="Número de Matricula" onChange={event => setMatricula(event.target.value)} />
            </label>
            <label>PRESIDIO:
              <input className="block" type="text" value={xpresidio} placeholder="Nome do Presídio" onChange={event => setPresidio(event.target.value)} />
            </label>
            <label>PROCESSO EXECUÇÃO:
              <input className='block' type="text" value={xprocesso} placeholder="Número do Processo" onChange={event => setProcesso(event.target.value)} />
            </label>
            <label>DT PRISÃO:
              <input className="block" type="date" value={xdataprisao} placeholder="Data da prisão" onChange={event => setDataprisao(event.target.value)} />
            </label>
            <label>PROGRESSÃO:
              <input className="block" type="date" value={xdataprogressao} placeholder="Data da progressão" onChange={event => setDataprogressao(event.target.value)} />
            </label>
            <label>CONDICIONAL:
              <input className="block" type="date" value={xdatacondicional} placeholder="Data da condicional" onChange={event => setDatacondicional(event.target.value)} />
            </label>
            <label>TÉRMINO:
              <input className="block" type="date" value={xdatafim} placeholder="Data fim da pena" onChange={event => setDatafim(event.target.value)} />
            </label>
          </div>
        </form>
      </main>
      {atualizando ?
        <button className="cursor-pointer" onClick={atualizar}>ATUALIZAR</button>
        :
        <button className="cursor-pointer" onClick={gravar}>GRAVAR</button>
      }
      <h1>Cadastro de Delitos</h1>
      <form className="border-2 text-sm text-">
        <div className="flex flex-row flex-wrap justify-between items-center">
          <label>Tipo de Crime
            <select className='block' value={xtipocrime} name="crimes" id="crimes" onChange={event => setTipocrime(event.target.value)}>
              <option value="1">Crime não hediondo posterior a Lei 13.964, sem violencia ou grave ameaça a pessoa. 1</option>
              <option value="2">Crime não hediondo posterior a Lei 13.964, com violencia ou grave ameaça a pessoa. 2</option>
              <option value="3">Crime hediondo ou equiparado, posterior a Lei 13.964, tendo ou não violencia ou grave ameaça a pessoa. 3</option>
              <option value="4">Crime hediondo ou equiparado, posterior a Lei 13.964, com resultado morte. 4</option>
              <option value="5">Crime não hediondo ou equiparado anterior a Lei 13.964. 5</option>
              <option value="6">Crime hediondo ou equiparado anterior a Lei 13.964 e posterior a Lei 11.464/07. 6</option>
              <option value="7">Crime hediondo ou equiparado anterior a Lei 11.464/07. 7</option>
              <option value="8">Exercer comando de organização criminosa para prática de crime hediondo. 8</option>
              <option value="9">Crime de constituição de milícia privada. 9</option>
              <option value="10">Art. 112 §3º LEP 1/8 Mulheres gestantes ou responsáveis. 10</option>
            </select>
          </label>
          <label>Rincidência
            <select className='block' value={xprirei} name="reincidencia" id="reincidencia" onChange={event => setPrirei(event.target.value)}>
              <option value="1">Primário</option>
              <option value="2">Reincidente</option>
            </select>
          </label>
          <label>Descrição
            <input className="block w-40" type="string" value={xdescriD} placeholder="Descrição do delito" onChange={event => setDescriD(event.target.value)} />
          </label>
          <label>Qt.Dias
            <input className="block w-16" type="number" value={xdiasPena} placeholder="Qtd. dias" onChange={event => setDiasPena(event.target.value)} />
          </label>
          <label>Qt.Meses
            <input className="block w-16" type="number" value={xmesesPena} placeholder="Qtd. meses" onChange={event => setMesesPena(event.target.value)} />
          </label>
          <label>Qt.Anos
            <input className="block w-16" type="number" value={xanosPena} placeholder="Qtd. anos" onChange={event => setAnosPena(event.target.value)} />
          </label>
        </div>
      </form>
      <div className=" bg-blue-300 text-center border-2 overflow-auto h-20">
        {delita?.map(deli => {
          return (
            <div className="flex justify-start text-sm">
              <a className="text-right cursor-pointer" onClick={() => editardelito(deli)}>
                <TbSelect />
              </a>
              <a className="text-right cursor-pointer" onClick={() => deletardelito(deli.descriD)}>
                <TbTrashOff />
              </a>
              <p className="text-left">{deli.descriD}</p>
            </div>
          )
        })}
      </div>
      {atualizando2 ? 
        <button className="cursor-pointer" onClick={atualizardelito}>ATUALIZAR</button>
      :
        <button className="cursor-pointer" onClick={gravardelito}>GRAVAR</button>
      }
    </Layout>
  )
}
