'use client';
import Layout from "@/components/template/Layout"
import { FormEvent, useEffect, useState } from "react"
import firebase from '../../firebase/config'

import { TbSelect } from "react-icons/tb"
import { TbTrashOff } from "react-icons/tb"

var clientes = [{}]
clientes.shift()


var delitos = [{}]
delitos.shift()

var remicoes = [{}]
remicoes.shift()


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
    percentual: string,
    fracao: string
}

type Remicao = {
    descricao: string,
    tipoRemicao: string,
    qtdI: string,
    qtdC: string,
    percentual: string,
    fracao: string
}

export default function Home() {


    // Clientes

    const [xnome, setNome] = useState('')
    const [xmatricula, setMatricula] = useState('')
    const [xprocesso, setProcesso] = useState('')
    const [xpresidio, setPresidio] = useState('')
    const [xdataprisao, setDataprisao] = useState('//')
    const [xdataprogressao, setDataprogressao] = useState('//')
    const [xdatacondicional, setDatacondicional] = useState('//')
    const [xdatafim, setDatafim] = useState('//')
    const db = firebase.firestore()

    // Delitos
    const [xtipocrime, setTipocrime] = useState('')
    const [xprirei, setPrirei] = useState('')
    const [xdescriD, setDescriD] = useState('')
    const [xdiasPena, setDiasPena] = useState('')
    const [xmesesPena, setMesesPena] = useState('')
    const [xanosPena, setAnosPena] = useState('')

    // Remição
    const [xdescricao, setDescricao] = useState('')
    const [xtipoRemicao, setTiporemicao] = useState('')
    const [xqtdI, setQtdI] = useState('')
    const [xqtdC, setQtdC] = useState('')


    const [status, setStatus] = useState(false)
    const [status2, setStatus2] = useState(false)
    const [status3, setStatus3] = useState(false)

    const [atualizando, setAtualizando] = useState(false)
    const [atualizando2, setAtualizando2] = useState(false)
    const [atualizando3, setAtualizando3] = useState(false)

    const [busca, setBusca] = useState<Cliente[]>()
    const [clienta, setClienta] = useState<Cliente[]>()
    const [delita, setDelita] = useState<Delito[]>()
    const [remica, setRemica] = useState<Remicao[]>()
    const [estabuscando, setEstabuscando] = useState(false)

    const [mostra, setMostra] = useState(false)

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
    }, [])

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
        if (xnome.length == 0) {
            db.collection("usuario").doc(id).collection("clientes").doc(' ').collection("delitos").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var y = doc.data()
                        delitos.push(y)
                    });
                    setDelita(delitos)
                    delitos = []
                }
                )
        } else {
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
    }, [status2])

    useEffect(() => {
        if (xnome.length == 0) {
            db.collection("usuario").doc(id).collection("clientes").doc(" ").collection("remicoes").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var z = doc.data()
                        remicoes.push(z)
                    });
                    setRemica(remicoes)
                    remicoes = []
                }
                )
        } else {
            db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("remicoes").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var z = doc.data()
                        remicoes.push(z)
                    });
                    setRemica(remicoes)
                    remicoes = []
                }
                )
        }
    }, [status3])


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
            delita?.map(deli => {

                db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").doc(deli.descriD).delete()
                    .then(() => {
                    }).catch((error) => {
                        console.error("Erro ao excluir Delito: ", error);
                    }
                    )
            })
            remica?.map(remi => {
                db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("remicoes").doc(remi.descricao).delete()
                    .then(() => {
                    }).catch((error) => {
                        console.error("Erro ao excluir Remição/Detração: ", error);
                    }
                    )
            })
            const referencia = db.collection("usuario/" + id + "/clientes/").doc(ref).delete()
                .then(() => {
                    setStatus(!status)
                    setStatus2(!status2)
                    setStatus3(!status3)
                }).catch((error) => {
                    console.error("Erro ao excluir cliente: ", error);
                }
                )
        }
    }


    function deletardelito(ref: string) {
        if (confirm("Confirma exclusão do Delito?") == true) {
            db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").doc(ref).delete()
                .then(() => {
                    //          alert("Delito excluido com sucesso!")
                    setStatus2(!status2)
                }).catch((error) => {
                    console.error("Erro ao excluir Delito: ", error);
                }
                )
        }
    }

    function deletarremicao(ref: string) {
        if (confirm("Confirma exclusão da Remição/Detração?") == true) {
            db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("remicoes").doc(ref).delete()
                .then(() => {
                    //          alert("Remição/Detração excluida com sucesso!")
                    setStatus3(!status3)
                }).catch((error) => {
                    console.error("Erro ao excluir Remição/Detração: ", error);
                }
                )
        }
    }

    function editardelito(ref: any) {
        setAtualizando2(true)
        setTipocrime(ref.tipocrime)
        setPrirei(ref.prirei)
        setDescriD(ref.descriD)
        setDiasPena(ref.diasPena)
        setMesesPena(ref.mesesPena)
        setAnosPena(ref.anosPena)
        setStatus2(!status2)
    }

    function editarremicao(ref: any) {
        setAtualizando3(true)
        setTiporemicao(ref.tipoRemicao)
        setDescricao(ref.descricao)
        setQtdI(ref.qtdI)
        setQtdC(ref.qtdC)
    }

    function editar(ref: any) {
        setAtualizando(true)
        setNome(ref.nome)
        setMatricula(ref.matricula)
        setPresidio(ref.presidio)
        setProcesso(ref.processo)
        setDataprisao(ref.dataprisao)
        setDataprogressao(ref.dataprogressao)
        setDatacondicional(ref.datacondicional)
        setDatafim(ref.datafim)
        setStatus2(!status2)
        setStatus3(!status3)
        setMostra(true)
    }

    function atualizar() {

        db.collection("usuario").doc(id).collection("clientes").doc(xnome).update({
            nome: xnome,
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
        var xpercentual = ''
        var xfracao = ''
        if (xtipocrime == '1') {
            if (xprirei == '1') {
                xpercentual = '16%'
                xfracao = '1/3'
            } else {
                xpercentual ='20%'
                xfracao = '1/2'
            }
        }
        if (xtipocrime == '2') {
            if (xprirei == '1') {
                xpercentual = '25%'
                xfracao = '1/3'
            } else {
                xpercentual = '30%'
                xfracao = '1/2'
            }
        }
        if (xtipocrime == '3') {
            if (xprirei == '1') {
                xpercentual = '40%'
                xfracao = '2/3'
            } else {
                xpercentual = '60%'
            }
        }
        if (xtipocrime == '4') {
            if (xprirei == '1') {
                xpercentual = '50%'
            } else {
                xpercentual = '70%'
            }
        }
        if (xtipocrime == '5') {
            if (xprirei == '1') {
                xpercentual = '1/6'
                xfracao = '1/3'
            } else {
                xpercentual = '1/6'
                xfracao = '1/2'
            }
        }
        if (xtipocrime == '6') {
            if (xprirei == '1') {
                xpercentual = '2/5'
                xfracao = '1/3'
            } else {
                xpercentual = '3/5'
                xfracao = '1/2'
            }
        }
        if (xtipocrime == '7') {
            xpercentual = '1/6'
            xfracao = '1/3'
        }
        if (xtipocrime == '8' || xtipocrime=='9') {
            xpercentual = '50%'
            if (xprirei == '1') {
                xfracao = '2/3'
            }
        }
        if (xtipocrime == '10') {
            xpercentual = '1/8'
            if (xprirei == '1') {
                xfracao = '1/3'
            } else {
                xfracao = '1/2'
            }
        }
        db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").doc(xdescriD).set({
            descriD: xdescriD,
            tipocrime: xtipocrime,
            prirei: xprirei,
            diasPena: xdiasPena,
            mesesPena: xmesesPena,
            anosPena: xanosPena,
            percentual: xpercentual,
            fracao: xfracao
        })
        alert("Delito cadastrado com sucesso!")
        setDescriD('')
        setTipocrime('')
        setPrirei('')
        setDiasPena('')
        setMesesPena('')
        setAnosPena('')
        setStatus2(!status2)
    }

    function gravarremicao() {
        var convertido = ''
        if (xtipoRemicao == "1") {
            convertido = (parseInt(xqtdI)).toString()
            setQtdC(convertido)
        }
        if (xtipoRemicao == "2") {
            convertido = (Math.trunc(parseInt(xqtdI) / 3)).toString()
            setQtdC(convertido)
        }
        if (xtipoRemicao == "3") {
            convertido = (Math.trunc(parseInt(xqtdI) / 12)).toString()
            setQtdC(convertido)
        }

        db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("remicoes").doc(xdescricao).set({
            descricao: xdescricao,
            tipoRemicao: xtipoRemicao,
            qtdI: xqtdI,
            qtdC: convertido,
        })
        alert("Remição/Detração cadastrado com sucesso!")
        setDescricao('')
        setTiporemicao('')
        setQtdI('')
        setQtdC('')
        setStatus3(!status3)
    }

    function atualizardelito() {
        var xpercentual = ''
        var xfracao = ''
        alert(xtipocrime)
        if (xtipocrime == '1') {
            if (xprirei == '1') {
                xpercentual = '16%'
                xfracao = '1/3'
                alert(xpercentual+" "+xfracao)
            } else {
                xpercentual ='20%'
                xfracao = '1/2'
            }
        }
        if (xtipocrime == '2') {
            if (xprirei == '1') {
                xpercentual = '25%'
                xfracao = '1/3'
            } else {
                xpercentual = '30%'
                xfracao = '1/2'
            }
        }
        if (xtipocrime == '3') {
            if (xprirei == '1') {
                xpercentual = '40%'
                xfracao = '2/3'
            } else {
                xpercentual = '60%'
            }
        }
        if (xtipocrime == '4') {
            if (xprirei == '1') {
                xpercentual = '50%'
            } else {
                xpercentual = '70%'
            }
        }
        if (xtipocrime == '5') {
            if (xprirei == '1') {
                xpercentual = '1/6'
                xfracao = '1/3'
            } else {
                xpercentual = '1/6'
                xfracao = '1/2'
            }
        }
        if (xtipocrime == '6') {
            if (xprirei == '1') {
                xpercentual = '2/5'
                xfracao = '1/3'
            } else {
                xpercentual = '3/5'
                xfracao = '1/2'
            }
        }
        if (xtipocrime == '7') {
            xpercentual = '1/6'
            xfracao = '1/3'
        }
        if (xtipocrime == '8' || xtipocrime=='9') {
            xpercentual = '50%'
            if (xprirei == '1') {
                xfracao = '2/3'
            }
        }
        if (xtipocrime == '10') {
            xpercentual = '1/8'
            if (xprirei == '1') {
                xfracao = '1/3'
            } else {
                xfracao = '1/2'
            }
        }
        alert(xpercentual+" "+xfracao)
        db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").doc(xdescriD).update({
            descriD: xdescriD,
            tipocrime: xtipocrime,
            prirei: xprirei,
            diasPena: xdiasPena,
            mesesPena: xmesesPena,
            anosPena: xanosPena,
            percentual: xpercentual,
            fracao: xfracao
        })
        alert("Delito atualizado com sucesso!")
        setDescriD('')
        setTipocrime('')
        setPrirei('')
        setDiasPena('')
        setMesesPena('')
        setAnosPena('')
        setStatus2(!status2)
        setAtualizando2(!atualizando2)
    }

    function atualizarremicao() {
        var convertido = ''
        if (xtipoRemicao == "1") {
            convertido = (parseInt(xqtdI)).toString()
            setQtdC(xqtdI)
        }
        if (xtipoRemicao == "2") {
            convertido = (Math.trunc(parseInt(xqtdI) / 3)).toString()
            setQtdC(convertido)
        }
        if (xtipoRemicao == "3") {
            convertido = (Math.trunc(parseInt(xqtdI) / 12)).toString()
            setQtdC(convertido)
        }

        db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("remicoes").doc(xdescricao).update({
            descricao: xdescricao,
            tiporemicao: xtipoRemicao,
            qtdI: xqtdI,
            qtdC: convertido
        })
        alert("Remição/Detração atualizado com sucesso!")
        setDescricao('')
        setTiporemicao('')
        setQtdI('')
        setQtdC('')
        setStatus3(!status3)
        setAtualizando3(!atualizando3)
    }

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

    function calculardatas() {
        var remissao = 0
        var dataf = new Date(xdataprisao)
        delita?.map(deli => {
            if (parseInt(deli.anosPena) > 0) {
                dataf.setDate(dataf.getDate() + (parseInt(deli.anosPena) * 365))
            }
            if (parseInt(deli.mesesPena) > 0) {
                dataf.setDate(dataf.getDate() + (parseInt(deli.mesesPena) * 30))
            }
            if (parseInt(deli.diasPena) > 0) {
                dataf.setDate(dataf.getDate() + parseInt(deli.diasPena))
            }
        })
        remica?.map(remi => {
            if (parseInt(remi.qtdC) > 0) {
                dataf.setDate(dataf.getDate() - parseInt(remi.qtdC))
                remissao = remissao + parseInt(remi.qtdC)
            }
        })
        dataf.setDate(dataf.getDate() + 1)

        var x = formatDate(dataf)
        x = x.toString()
        setDatafim(x)
        db.collection("usuario").doc(id).collection("clientes").doc(xnome).update({
            datafim: x
        })

        var condicional = true

        var dataf       = new Date(xdataprisao)
        var xdatal      = new Date(xdataprisao)
        var xdataini    = new Date(xdataprisao)
        var xdatap      = new Date(xdataprisao)
        var c1 = 0 
        var d1 = 0 
        var calculap = 0
        var calculal = 0
        delita?.map(deli => {
            dataf       = new Date(xdataprisao)
            if (parseInt(deli.anosPena) > 0) {
                dataf.setDate(dataf.getDate() + (parseInt(deli.anosPena) * 365))
            }
            if (parseInt(deli.mesesPena) > 0) {
                dataf.setDate(dataf.getDate() + (parseInt(deli.mesesPena) * 30))
            }
            if (parseInt(deli.diasPena) > 0) {
                dataf.setDate(dataf.getDate() + parseInt(deli.diasPena))
            }
            c1 = Math.abs(dataf.getTime() - xdataini.getTime())
            d1 = Math.ceil(c1 / (1000 * 3600 * 24))
            if (deli.tipocrime == "1") {
                if (deli.prirei == "1") {
                    calculap = (d1 * 16 / 100)
                    calculal = (d1 / 3 * 1)
                } else {
                    calculap = (d1 * 20 / 100)
                    calculal = (d1 / 2 * 1)
                }
            }
            if (deli.tipocrime == "2") {
                if (deli.prirei == "1") {
                    calculap = d1 * 25 / 100
                    calculal = (d1 / 3 * 1)
                } else {
                    calculap = d1 * 30 / 100
                    calculal = (d1 / 2 * 1)
                }
            }
            if (deli.tipocrime == "3") {
                if (deli.prirei == "1") {
                    calculap = d1 * 40 / 100
                    calculal = (d1 * 2 / 3)
                } else {
                    calculap = d1 * 60 / 100
                    condicional = false
                }
            }
            if (deli.tipocrime == "4") {
                condicional = false
                if (deli.prirei == "1") {
                    calculap = d1 * 50 / 100
                } else {
                    calculap = d1 * 70 / 100
                }
            }
            if (deli.tipocrime == "5") {
                calculap = (d1 * 1 / 6)
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 1)
                } else {
                    calculal = (d1 / 2 * 1)
                }
            }
            if (deli.tipocrime == "6") {
                if (deli.prirei == "1") {
                    calculap = (d1 * 2 / 5)
                    calculal = (d1 / 3 * 1)
                } else {
                    calculap = (d1 * 3 / 5)
                    calculal = (d1 / 2 * 1)
                }
            }
            if (deli.tipocrime == "7") {
                calculap = (d1 * 1 / 6)
                calculal = (d1 / 3 * 2)
            }
            if (deli.tipocrime == "8" || deli.tipocrime == "9") {
                calculap = (d1 * 50 / 100)
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 2)
                } else {
                    condicional = false
                }
            }
            if (deli.tipocrime == "10") {
                calculap = (d1 * 1 / 8)
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 1)
                } else {
                    calculal = (d1 / 2 * 1)
                }
            }
            xdatap.setDate(xdatap.getDate() + calculap )
            xdatal.setDate(xdatal.getDate() + calculal )
            c1 = 0
            d1 = 0
        })
        // bug de datas acrescentar 1 dia
        xdatap.setDate(xdatap.getDate() + 1 )
        xdatal.setDate(xdatal.getDate() + 1 )

        var y = formatDate(xdatap)
        y = y.toString()
        setDataprogressao(y)

        if(condicional){
            var z = formatDate(xdatal)
            z = z.toString()
            setDatacondicional(z)
        }else{
            z = '//'
        }

        db.collection("usuario").doc(id).collection("clientes").doc(xnome).update({
            dataprogressao: y,
            datacondicional: z
        })
        setStatus(!status)
    }

    return (
        <Layout titulo="Sistema de Controle de Execução Penal" subtitulo="Cadastros de Clientes/Delitos/Remição e Detração">
            <h1 className="">Cadastro de Clientes</h1>
            <main className="flex justify-center items-center">
                <form className="mr-1 w-full flex border-2 rounded">
                    <div className="w-3/6 p-1 flex flex-col">
                        <div className="flex flex-col justify-between items-left">
                            <input type="text" className=" dark:bg-gray-400 dark:placeholder-white" placeholder="Buscar" onChange={buscar} />
                        </div>
                        <div className=" bg-blue-400 text-center border-2 h-20 overflow-auto">
                            {estabuscando ?
                                busca?.map(cli => {
                                    return (
                                        <div key={cli.nome} className="flex justify-start text-base font-bold pl-1 pt-1 items-center">
                                            <a className="cursor-pointer text-green-800" onClick={() => editar(cli)}>
                                                <TbSelect />
                                            </a>
                                            <a className="cursor-pointer text-red-500" onClick={() => deletar(cli.nome)}>
                                                <TbTrashOff />
                                            </a>
                                            <p className="">{cli.nome+" Pr. "+cli.dataprogressao}</p>
                                        </div>
                                    )
                                })
                                :
                                clienta?.map(cli => {
                                    return (
                                        <div className="flex justify-start text-sm pl-1 pt-1 items-center">
                                            <a className="cursor-pointer mr-1 text-green-800 font-bold" onClick={() => editar(cli)}>
                                                <TbSelect />
                                            </a>
                                            <a className="cursor-pointer mr-1 text-red-500" onClick={() => deletar(cli.nome)}>
                                                <TbTrashOff />
                                            </a>
                                            <p className="">{cli.nome+" Pr. "+cli.dataprogressao}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between items-center p-1 dark:text-white text-black" >
                        {atualizando ?
                            <label >NOME:
                                <input readOnly className="block dark:bg-gray-400 dark:placeholder-white" type="text" value={xnome} placeholder="Nome do cliente" onChange={event => setNome(event.target.value)} />
                            </label>
                            :
                            <label >NOME:
                                <input className="block dark:bg-gray-400 dark:placeholder-white" type="text" value={xnome} placeholder="Nome do cliente" onChange={event => setNome(event.target.value)} />
                            </label>
                        }
                        <label>MATRICULA:
                            <input required className='block  dark:bg-gray-400 dark:placeholder-white' type="text" value={xmatricula} placeholder="Número de Matricula" onChange={event => setMatricula(event.target.value)} />
                        </label>
                        <label>PRESIDIO:
                            <input className="block  dark:bg-gray-400 dark:placeholder-white" type="text" value={xpresidio} placeholder="Nome do Presídio" onChange={event => setPresidio(event.target.value)} />
                        </label>
                        <label>PROCESSO EXECUÇÃO:
                            <input className='block dark:bg-gray-400 dark:placeholder-white' type="text" value={xprocesso} placeholder="Número do Processo" onChange={event => setProcesso(event.target.value)} />
                        </label>
                        <label>DT PRISÃO:
                            <input className="block dark:bg-gray-400" type="date" value={xdataprisao} placeholder="Data da prisão" onChange={event => setDataprisao(event.target.value)} />
                        </label>
                        <label>PROGRESSÃO:
                            <input readOnly className="block dark:bg-gray-400" type="date" value={xdataprogressao} placeholder="Data da progressão" onChange={event => setDataprogressao(event.target.value)} />
                        </label>
                        <label>CONDICIONAL:
                            <input readOnly className="block dark:bg-gray-400" type="date" value={xdatacondicional} placeholder="Data da condicional" onChange={event => setDatacondicional(event.target.value)} />
                        </label>
                        <label>TÉRMINO:
                            <input readOnly className="block dark:bg-gray-400" type="date" value={xdatafim} placeholder="Data fim da pena" onChange={event => setDatafim(event.target.value)} />
                        </label>
                    </div>
                </form>
            </main>
            {atualizando ?
                <div className="flex justify-end">
                    <button className="cursor-pointer w-32 mt-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={atualizar}>ATUALIZAR</button>
                    <button className="cursor-pointer ml-3 w-32 mt-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={calculardatas}>CALCULAR</button>
                </div>
                :
                <>
                    <div className="flex justify-end">
                        <button className="cursor-pointer w-24 mt-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={gravar}>GRAVAR</button>
                    </div>
                </>
            }

            {mostra ?
                <>
                    <h1>Cadastro de Delitos</h1>
                    <form className="border-2 text-sm flex rounded">
                        <div className=" bg-blue-400 text-center border-2 overflow-auto h-20 w-full">
                            {delita?.map(deli => {
                                return (
                                    <div className="flex justify-start text-sm pl-1 pt-1 items-center">
                                        <a className="text-right mr-1 cursor-pointer font-bold text-green-800" onClick={() => editardelito(deli)}>
                                            <TbSelect />
                                        </a>
                                        <a className="text-right mr-1 cursor-pointer text-red-500" onClick={() => deletardelito(deli.descriD)}>
                                            <TbTrashOff />
                                        </a>
                                        <p className="text-left">{deli.descriD + " Prog. "+deli.percentual + " Cond. " + deli.fracao+" Pena " + deli.anosPena + " A " + deli.mesesPena + " M " + deli.diasPena + " D"}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-row flex-wrap justify-between items-center">
                            <label>Tipo de Crime
                                <select className='block  dark:bg-gray-400' value={xtipocrime} name="crimes" id="crimes" onChange={event => setTipocrime(event.target.value)}>
                                    <option value="0">Selecione o tipo de crime</option>
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
                            <label>Reincidência
                                <select className='block dark:bg-gray-400' value={xprirei} name="reincidencia" id="reincidencia" onChange={event => setPrirei(event.target.value)}>
                                    <option value="0">Selecione</option>
                                    <option value="1">Primário</option>
                                    <option value="2">Reincidente</option>
                                </select>
                            </label>
                            {atualizando2 ?
                                <label>Descrição
                                    <input readOnly className="block w-72 dark:bg-gray-400 dark:placeholder-white" type="string" value={xdescriD} placeholder="Descrição do delito" onChange={event => setDescriD(event.target.value)} />
                                </label>
                                :
                                <label>Descrição
                                    <input className="block w-72 dark:bg-gray-400 dark:placeholder-white" type="string" value={xdescriD} placeholder="Descrição do delito" onChange={event => setDescriD(event.target.value)} />
                                </label>
                            }
                            <label>Qt.Anos
                                <input className="block w-16 dark:bg-gray-400 dark:placeholder-white" type="number" value={xanosPena} placeholder="Anos" onChange={event => setAnosPena(event.target.value)} />
                            </label>
                            <label>Qt.Meses
                                <input className="block w-16 dark:bg-gray-400 dark:placeholder-white" type="number" value={xmesesPena} placeholder="Meses" onChange={event => setMesesPena(event.target.value)} />
                            </label>
                            <label>Qt.Dias
                                <input className="block w-16 dark:bg-gray-400 dark:placeholder-white" type="number" value={xdiasPena} placeholder="Dias" onChange={event => setDiasPena(event.target.value)} />
                            </label>
                        </div>
                    </form>
                    {atualizando2 ?
                        <button className="cursor-pointer w-32 self-end mt-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={atualizardelito}>ATUALIZAR</button>
                        :
                        <button className="cursor-pointer w-24 self-end mt-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={gravardelito}>GRAVAR</button>
                    }

                    <h1>Cadastro de Detração e Remições</h1>
                    <form className="border-2 flex rounded">
                        <div className=" bg-blue-400 text-center border-2 overflow-auto h-20 w-2/5">
                            {remica?.map(remi => {
                                return (
                                    <div className="flex justify-start text-sm pl-1 pt-1 items-center">
                                        <a className="text-right mr-1 cursor-pointer font-bold text-green-800" onClick={() => editarremicao(remi)}>
                                            <TbSelect />
                                        </a>
                                        <a className="text-right mr-1 cursor-pointer text-red-500" onClick={() => deletarremicao(remi.descricao)}>
                                            <TbTrashOff />
                                        </a>
                                        <p className="text-left">{remi.descricao + " QT.INF. " + remi.qtdI + " QT.CALC. " + remi.qtdC}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-row flex-wrap justify-between items-center w-3/5">
                            <label>Remição / Detração
                                <select className='block dark:bg-gray-400' value={xtipoRemicao} name="remicao" id="remicao" onChange={event => setTiporemicao(event.target.value)}>
                                    <option value="0" >Selecione</option>
                                    <option value="1" >Detração</option>
                                    <option value="2" >Remição por Trabalho</option>
                                    <option value="3" >Remição por Estudo</option>
                                </select>
                            </label>
                            {atualizando3 ?
                                <label>Descrição
                                    <input readOnly className="block w-72 dark:bg-gray-400 dark:placeholder-white" type="string" value={xdescricao} placeholder="Descrição Remição/Detração" onChange={event => setDescricao(event.target.value)} />
                                </label>
                                :
                                <label>Descrição
                                    <input className="block w-72 dark:bg-gray-400 dark:placeholder-white" type="string" value={xdescricao} placeholder="Descrição Remição/Detração" onChange={event => setDescricao(event.target.value)} />
                                </label>
                            }
                            <label>Qt.Informada
                                <input className="block w-20 dark:bg-gray-400 dark:placeholder-white" type="number" value={xqtdI} placeholder="Inf." onChange={event => setQtdI(event.target.value)} />
                            </label>
                            <label>Qt.Calculada
                                <input readOnly className="block w-20 dark:bg-gray-400 dark:placeholder-white" type="number" value={xqtdC} placeholder="Calc." onChange={event => setQtdC(event.target.value)} />
                            </label>
                        </div>
                    </form>
                    {atualizando3 ?
                        <button className="cursor-pointer w-232 self-end mt-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={atualizarremicao}>ATUALIZAR</button>
                        :
                        <button className="cursor-pointer w-24 self-end mt-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={gravarremicao}>GRAVAR</button>
                    }
                </>
                :
                <>
                </>
            }
        </Layout>
    )
}
