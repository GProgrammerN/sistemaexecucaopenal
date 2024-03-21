'use client';
import Layout from "@/components/template/Layout"
import { FormEvent, useEffect, useState } from "react"
import firebase from '../../firebase/config'
import Cookies from "js-cookie";
import { TbSelect } from "react-icons/tb"
import { TbTrashOff } from "react-icons/tb"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";

var clientes = [{}]
clientes.shift()

var clientes2 = [{}]
clientes2.shift()


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
    dataprogressao2: string,
    datacondicional: string,
    datafim: string,
    datafalta: string
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
    const [xdataprogressao2, setDataprogressao2] = useState('//')
    const [xdatacondicional, setDatacondicional] = useState('//')
    const [xdatafim, setDatafim] = useState('//')
    const [xdatafalta, setDatafalta] = useState('//')

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
    const [cliento, setCliento] = useState<Cliente[]>()

    const [delita, setDelita] = useState<Delito[]>()
    const [remica, setRemica] = useState<Remicao[]>()
    const [estabuscando, setEstabuscando] = useState(false)

    const [mostra, setMostra] = useState(false)


    var currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        useRouter().push('/autenticacao');
        return;
    }
    var id = currentUser.uid;

    if (Cookies.get('bloqueio')) {
        useRouter().push('/assinatura');
    }

    const referencia = db.collection("usuario/").doc(id);
    
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

        db.collection("usuario/" + id + "/clientes/").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var y = doc.data()
                    const obj = JSON.parse(JSON.stringify(y))
                    var datap1 = obj.dataprogressao
                    var datap2 = obj.dataprogressao2
                    var datalc = obj.datacondicional
                    var datar1 = new Date(datap1)
                    var datar2 = new Date(datap2)
                    var datarc = new Date(datalc)
                    var dataAtual = new Date()

                    let d1 = differenceInDays(datar1, dataAtual)
                    let d2 = differenceInDays(datar2, dataAtual)
                    let d3 = differenceInDays(datarc, dataAtual)
                    if (d1 <= 60 && d1 >= 0 || d2 <= 60 && d2 >= 0 || d3 <= 60 && d3 >= 0) {
                        clientes2.push(y)
                    }
                });
                setCliento(clientes2)
                clientes2 = []
            })
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
        db.collection("usuario/" + id + "/clientes/").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var y = doc.data()
                    const obj = JSON.parse(JSON.stringify(y))
                    var datap1 = obj.dataprogressao
                    var datap2 = obj.dataprogressao2
                    var datalc = obj.datacondicional
                    var datar1 = new Date(datap1)
                    var datar2 = new Date(datap2)
                    var datarc = new Date(datalc)
                    var dataAtual = new Date()
                    let d1 = differenceInDays(datar1, dataAtual)
                    let d2 = differenceInDays(datar2, dataAtual)
                    let d3 = differenceInDays(datarc, dataAtual)
                    if (d1 <= 60 && d1 >= 0 || d2 <= 60 && d2 >= 0 || d3 <= 60 && d3 >= 0) {
                        clientes2.push(y)
                    }
                });
                setCliento(clientes2)
                clientes2 = []
            })

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
                        console.error("Erro ao excluir Delitos: ", error);
                    }
                    )
            })
            remica?.map(remi => {
                db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("remicoes").doc(remi.descricao).delete()
                    .then(() => {
                    }).catch((error) => {
                        console.error("Erro ao excluir Remições/Detração: ", error);
                    }
                    )
            })
            db.collection("usuario/" + id + "/clientes/").doc(ref).delete()
                .then(() => {
                    setNome('')
                    setMatricula('')
                    setPresidio('')
                    setProcesso('')
                    setDataprisao('')
                    setDataprogressao('')
                    setDataprogressao2('')
                    setDatacondicional('')
                    setDatafim('')
                    setDatafalta('')
                    setStatus(!status)
                    setStatus2(!status2)
                    setStatus3(!status3)
                    setAtualizando(!atualizando)
                    setMostra(!mostra)
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
                    setStatus2(!status2)
                    setAtualizando2(false)
                    setDescriD('')
                    setTipocrime('')
                    setPrirei('')
                    setDiasPena('')
                    setMesesPena('')
                    setAnosPena('')
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
                    setStatus3(!status3)
                    setAtualizando3(false)
                    setDescricao('')
                    setTiporemicao('')
                    setQtdI('')
                    setQtdC('')
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
        setDataprogressao2(ref.dataprogressao2)
        setDatacondicional(ref.datacondicional)
        setDatafim(ref.datafim)
        setDatafalta(ref.datafalta)
        setStatus2(!status2)
        setStatus3(!status3)
        setMostra(true)
        //-------------------------->delitos
        setAtualizando2(false)
        setDescriD('')
        setTipocrime('')
        setPrirei('')
        setDiasPena('')
        setMesesPena('')
        setAnosPena('')
        setStatus2(!status2)
        //-------------------------->remições
        setAtualizando3(false)
        setDescricao('')
        setTiporemicao('')
        setQtdI('')
        setQtdC('')
        setStatus3(!status3)
    }

    function novo() {
        setNome('')
        setMatricula('')
        setPresidio('')
        setProcesso('')
        setDataprisao('')
        setDataprogressao('')
        setDataprogressao2('')
        setDatacondicional('')
        setDatafim('')
        setDatafalta('')
        setAtualizando(false)
        setStatus(!status)
        setMostra(!mostra)
    }

    function atualizar() {

        db.collection("usuario").doc(id).collection("clientes").doc(xnome).update({
            nome: xnome,
            matricula: xmatricula,
            processo: xprocesso,
            presidio: xpresidio,
            dataprisao: xdataprisao,
            dataprogressao: xdataprogressao,
            dataprogressao2: xdataprogressao2,
            datacondicional: xdatacondicional,
            datafim: xdatafim,
            datafalta: xdatafalta
        }).then(() => {
            alert("Cliente atualizado com sucesso!")
            setNome('')
            setMatricula('')
            setPresidio('')
            setProcesso('')
            setDataprisao('')
            setDataprogressao('')
            setDataprogressao2('')
            setDatacondicional('')
            setDatafim('')
            setDatafalta('')
            setAtualizando(false)
            setStatus(!status)
            setMostra(!mostra)
        }).catch((erro) => {
            alert('Erro ao atualizar cliente' + erro.message)
        })
    }

    function gravar() {
        if (xnome != '') {
            db.collection('usuario/' + id + '/clientes/').doc(xnome).get()
                .then((test) => {
                    if (test.exists) {
                        alert("Não é possível criar dois clientes com mesmo nome. Acrescente um diferencial.")
                    } else {
                        db.collection('usuario/' + id + '/clientes/').doc(xnome).set({
                            nome: xnome,
                            matricula: xmatricula,
                            processo: xprocesso,
                            presidio: xpresidio,
                            dataprisao: xdataprisao,
                            dataprogressao: xdataprogressao,
                            dataprogressao2: xdataprogressao2,
                            datacondicional: xdatacondicional,
                            datafim: xdatafim,
                            datafalta: xdatafalta
                        }).then(() => {
                            alert("Cliente cadastrado com sucesso!")
                            setNome('')
                            setMatricula('')
                            setPresidio('')
                            setProcesso('')
                            setDataprisao('')
                            setDataprogressao('')
                            setDataprogressao2('')
                            setDatacondicional('')
                            setDatafim('')
                            setDatafalta('')
                            setStatus(!status)
                        }).catch((erro) => {
                            alert('Erro ao cadastrar cliente' + erro.message)
                        })
                    }
                }).catch(() => {

                })

        } else {
            alert("Não é possivel gravar clientes sem preencher o nome!")
        }
    }

    function gravardelito() {
        if (xdescriD !== '') {

            var xpercentual = ''
            var xfracao = ''
            if (xtipocrime == '1') {
                if (xprirei == '1') {
                    xpercentual = '16%'
                    xfracao = '1/3'
                } else {
                    xpercentual = '20%'
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
            if (xtipocrime == '8' || xtipocrime == '9') {
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
            }).then(() => {
                alert("Delito cadastrado com sucesso!")
                setDescriD('')
                setTipocrime('')
                setPrirei('')
                setDiasPena('')
                setMesesPena('')
                setAnosPena('')
                setStatus2(!status2)
            }).catch((error) => {
                alert('Erro ao cadastrar delito ' + error.message)
            })
        } else {
            alert("Não é possivel gravar delitos sem preencher a descriçao!")
        }
    }

    function gravarremicao() {
        if (xdescricao !== '') {

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
            }).then(() => {
                alert("Remição/Detração cadastrado com sucesso!")
                setDescricao('')
                setTiporemicao('')
                setQtdI('')
                setQtdC('')
                setStatus3(!status3)
            }).catch((error) => {
                alert('Erro ao cadastrar Remição/Detração ' + error.message)
            })
        } else {
            alert("Não é possivel gravar remições ou detração sem preencher a descriçao!")
        }
    }

    function atualizardelito() {
        var xpercentual = ''
        var xfracao = ''
        if (xtipocrime == '1') {
            if (xprirei == '1') {
                xpercentual = '16%'
                xfracao = '1/3'
            } else {
                xpercentual = '20%'
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
        if (xtipocrime == '8' || xtipocrime == '9') {
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
        db.collection("usuario").doc(id).collection("clientes").doc(xnome).collection("delitos").doc(xdescriD).update({
            descriD: xdescriD,
            tipocrime: xtipocrime,
            prirei: xprirei,
            diasPena: xdiasPena,
            mesesPena: xmesesPena,
            anosPena: xanosPena,
            percentual: xpercentual,
            fracao: xfracao
        }).then(() => {
            alert("Delito atualizado com sucesso!")
            setDescriD('')
            setTipocrime('')
            setPrirei('')
            setDiasPena('')
            setMesesPena('')
            setAnosPena('')
            setStatus2(!status2)
            setAtualizando2(!atualizando2)
        }).catch((error) => {
            alert('Erro ao atualizar Delito ' + error.message)
        })
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
        }).then(() => {
            alert("Remição/Detração atualizado com sucesso!")
            setDescricao('')
            setTiporemicao('')
            setQtdI('')
            setQtdC('')
            setStatus3(!status3)
            setAtualizando3(!atualizando3)
        }).catch((error) => {
            alert('Erro ao atualizar Remição/Detração ' + error.message)
        })
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

    function formatDate2(Ref: Date) {
        var d = new Date(Ref)
        if (!isNaN(d.getTime())) {
            d.setDate(d.getDate() + 1)

            var month = '' + (d.getMonth() + 1)
            var day = '' + d.getDate()
            var year = d.getFullYear()
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [day, month, year].join('/');
        } else {
            return ['//']
        }
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
        }).then(() => {

        }).catch((error) => {
            alert('Erro inesperado ao gravar datafim ' + error.message)
        })

        // -----------------------> ATÉ AQUI CALCULOU E GRAVOU A DATA FIM DA PENA 
        var dataf = new Date(xdataprisao)
        var xdatal = new Date(xdataprisao)
        var xdataini = new Date(xdataprisao)
        var xdatap = new Date(xdataprisao)
        var c1 = 0
        var d1 = 0
        var calculap = 0
        var calculal = 0
        delita?.map(deli => {
            dataf = new Date(xdataprisao)
            if (parseInt(deli.anosPena) > 0) {
                dataf.setDate(dataf.getDate() + (parseInt(deli.anosPena) * 365))
            }
            if (parseInt(deli.mesesPena) > 0) {
                dataf.setDate(dataf.getDate() + (parseInt(deli.mesesPena) * 30))
            }
            if (parseInt(deli.diasPena) > 0) {
                dataf.setDate(dataf.getDate() + parseInt(deli.diasPena))
            }
            d1 = differenceInDays(dataf, xdataini)
            if (deli.tipocrime == "1") {
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 1)
                } else {
                    calculal = (d1 / 2 * 1)
                }
            }
            if (deli.tipocrime == "2") {
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 1)
                } else {
                    calculal = (d1 / 2 * 1)
                }
            }
            if (deli.tipocrime == "3") {
                if (deli.prirei == "1") {
                    calculal = (d1 * 2 / 3)
                } else {
                    calculal = d1
                }
            }
            if (deli.tipocrime == "4") {
                calculal = d1
            }
            if (deli.tipocrime == "5") {
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 1)
                } else {
                    calculal = (d1 / 2 * 1)
                }
            }
            if (deli.tipocrime == "6") {
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 1)
                } else {
                    calculal = (d1 / 2 * 1)
                }
            }
            if (deli.tipocrime == "7") {
                calculal = (d1 / 3 * 2)
            }
            if (deli.tipocrime == "8" || deli.tipocrime == "9") {
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 2)
                } else {
                    calculal = d1
                }
            }
            if (deli.tipocrime == "10") {
                if (deli.prirei == "1") {
                    calculal = (d1 / 3 * 1)
                } else {
                    calculal = (d1 / 2 * 1)
                }
            }
            xdatal.setDate(xdatal.getDate() + calculal)
            c1 = 0
            d1 = 0
        })
        // bug de datas acrescentar 1 dia
        xdatal.setDate(xdatal.getDate() + 1 - remissao)
        var z = formatDate(xdatal)
        z = z.toString()
        setDatacondicional(z)
        db.collection("usuario").doc(id).collection("clientes").doc(xnome).update({
            datacondicional: z
        }).then(() => {

        }).catch((error) => {
            alert('Erro inesperado ao gravar condicional ' + error.message)
        })
        //----------------------------------------------> ATÉ AQUI CALCULOU E GRAVOU CONDICIONAL
        const xpro = new Date(xdataprogressao)
        const dataatual = new Date()
        if (xdatafalta != '' && xdatafalta != '//' || xpro > dataatual || xdataprogressao === '//' || xdataprogressao === '') {
            var xdataini = new Date(xdataprisao)
            if (xdatafalta === '//' || xdatafalta === '') {
                var xdatap = new Date(xdataprisao)
            } else {
                var xdatap = new Date(xdatafalta)
            }
            var c1 = 0
            var d1 = 0
            var calculap = 0
            let vez = 1
            let d2 = 0
            delita?.map(deli => {
                var dataf = new Date(xdataprisao)
                if (parseInt(deli.anosPena) > 0) {
                    dataf.setDate(dataf.getDate() + (parseInt(deli.anosPena) * 365))
                }
                if (parseInt(deli.mesesPena) > 0) {
                    dataf.setDate(dataf.getDate() + (parseInt(deli.mesesPena) * 30))
                }
                if (parseInt(deli.diasPena) > 0) {
                    dataf.setDate(dataf.getDate() + parseInt(deli.diasPena))
                }

                d1 = differenceInDays(dataf, xdataini)
                if (xdatafalta != '//' && xdatafalta != '') {
                    if (vez === 1) {
                        var xx = new Date(xdatafalta)
                        var yy = new Date(xdataprisao)
                        d2 = differenceInDays(xx, yy)
                        d1 = (d1 - d2)
                        vez = 2
                    }
                }
                if (deli.tipocrime == "1") {
                    if (deli.prirei == "1") {
                        calculap = (d1 * 16 / 100)
                    } else {
                        calculap = (d1 * 20 / 100)
                    }
                }
                if (deli.tipocrime == "2") {
                    if (deli.prirei == "1") {
                        calculap = d1 * 25 / 100
                    } else {
                        calculap = d1 * 30 / 100
                    }
                }
                if (deli.tipocrime == "3") {
                    if (deli.prirei == "1") {
                        calculap = d1 * 40 / 100
                    } else {
                        calculap = d1 * 60 / 100
                    }
                }
                if (deli.tipocrime == "4") {
                    if (deli.prirei == "1") {
                        calculap = d1 * 50 / 100
                    } else {
                        calculap = d1 * 70 / 100
                    }
                }
                if (deli.tipocrime == "5") {
                    calculap = (d1 * 1 / 6)
                }
                if (deli.tipocrime == "6") {
                    if (deli.prirei == "1") {
                        calculap = (d1 * 2 / 5)
                    } else {
                        calculap = (d1 * 3 / 5)
                    }
                }
                if (deli.tipocrime == "7") {
                    calculap = (d1 * 1 / 6)
                }
                if (deli.tipocrime == "8" || deli.tipocrime == "9") {
                    calculap = (d1 * 50 / 100)
                }
                if (deli.tipocrime == "10") {
                    calculap = (d1 * 1 / 8)
                }
                xdatap.setDate(xdatap.getDate() + calculap)
                c1 = 0
                d1 = 0
            })
            // bug de datas acrescentar 1 dia
            xdatap.setDate(xdatap.getDate() + 1 - remissao)
            remissao = 0
            var y = formatDate(xdatap)
            y = y.toString()
            setDataprogressao(y)
            db.collection("usuario").doc(id).collection("clientes").doc(xnome).update({
                dataprogressao: y,
            }).then(() => {

            }).catch((error) => {
                alert('Erro inesperado ao gravar dataprogressao ' + error.message)
            })
        } else {
            y = xdataprogressao
        }
        //--------------------> ATÉ AQUI SE A DATA DA PROGRESSÃO FOSSE MENOR QUE DATA ATUAL NÃO CALCULA POIS JÁ FOI A PROGRESSAO

        y = formatDate(y)
        var dataf = new Date(xdataprisao)
        var xdataini = new Date(xdataprisao)
        var xdatap = new Date(y)
        var c1 = 0
        var d1 = 0
        var c2 = 0
        var d2 = 0
        var calculap = 0
        var calculal = 0
        var vez = 1
        delita?.map(deli => {
            dataf = new Date(xdataprisao)
            if (parseInt(deli.anosPena) > 0) {
                dataf.setDate(dataf.getDate() + (parseInt(deli.anosPena) * 365))
            }
            if (parseInt(deli.mesesPena) > 0) {
                dataf.setDate(dataf.getDate() + (parseInt(deli.mesesPena) * 30))
            }
            if (parseInt(deli.diasPena) > 0) {
                dataf.setDate(dataf.getDate() + parseInt(deli.diasPena))
            }
            d1 = differenceInDays(dataf, xdataini)
            if (vez === 1) {
                var xx = new Date(y)
                var yy = new Date(xdataprisao)
                d2 = differenceInDays(xx, yy)
                d1 = (d1 - d2)
                vez = 2
            }
            if (deli.tipocrime == "1") {
                if (deli.prirei == "1") {
                    calculap = (d1 * 16 / 100)
                } else {
                    calculap = (d1 * 20 / 100)
                }
            }
            if (deli.tipocrime == "2") {
                if (deli.prirei == "1") {
                    calculap = (d1 * 25 / 100)
                } else {
                    calculap = (d1 * 30 / 100)
                }
            }
            if (deli.tipocrime == "3") {
                if (deli.prirei == "1") {
                    calculap = (d1 * 40 / 100)
                } else {
                    calculap = (d1 * 60 / 100)
                }
            }
            if (deli.tipocrime == "4") {
                if (deli.prirei == "1") {
                    calculap = (d1 * 50 / 100)
                } else {
                    calculap = (d1 * 70 / 100)
                }
            }
            if (deli.tipocrime == "5") {
                calculap = (d1 * 1 / 6)
            }
            if (deli.tipocrime == "6") {
                if (deli.prirei == "1") {
                    calculap = (d1 * 2 / 5)
                } else {
                    calculap = (d1 * 3 / 5)
                }
            }
            if (deli.tipocrime == "7") {
                calculap = (d1 * 1 / 6)
            }
            if (deli.tipocrime == "8" || deli.tipocrime == "9") {
                calculap = (d1 * 50 / 100)
            }
            if (deli.tipocrime == "10") {
                calculap = (d1 * 1 / 8)
            }
            xdatap.setDate(xdatap.getDate() + calculap)
            c1 = 0
            d1 = 0
        })
        // bug de datas acrescentar 1 dia
        xdatap.setDate(xdatap.getDate() + 1 - remissao)

        var w = formatDate(xdatap)
        w = w.toString()
        setDataprogressao2(w)

        db.collection("usuario").doc(id).collection("clientes").doc(xnome).update({
            dataprogressao2: w,
            datafalta: xdatafalta,
        }).then(() => {

        }).catch((error) => {
            alert('Erro inesperado ao gravar dataprogressao2 ' + error.message)
        })
        //        setStatus(!status)
    }
    //---------------------------> CALCULA E GRAVA PROGRESSAO2

    function gerarPDF() {
        var xdata = ''
        if (xdatafalta !== '' && xdatafalta !== '//') {
            xdata = formatDate2(xdatafalta)
        }

        pdfMake.vfs = pdfFonts.pdfMake.vfs;


        const reportTitle = [
            {
                text: [
                    'SISTEMA DE CONTROLE DE EXECUÇÃO PENAL' + '\n\n',
                    'Relatório de Progressão de Regime',
                ],
                fontSize: 14,
                alignment: 'center',
                bold: true,
                margin: [15, 20, 0, 45]
            }
        ];

        const dados = delita?.map((deli) => {
            return [
                { text: deli.descriD, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: deli.prirei, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: deli.percentual, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: deli.fracao, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: deli.anosPena, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: deli.mesesPena, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: deli.diasPena, fontSize: 9, margin: [0, 2, 0, 2] }
            ]
        })

        const dados2 = remica?.map((remi) => {
            return [
                { text: remi.descricao, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: remi.tipoRemicao, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: remi.qtdI, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: remi.qtdC, fontSize: 9, margin: [0, 2, 0, 2] },
            ]
        })


        const details = [
            {
                text: ['Relatório de Progressão de Regime' + '\n'],
                fontSize: 14,
                alignment: 'center',
                bold: true,
            },
            {
                text: [
                    'Nome: ' + xnome + '     Nº de Matricula: ' + xmatricula + '\n\n',
                    ' Presídio: ' + xpresidio + '     Processo Execução: ' + xprocesso + '\n\n',
                    ' Data da Prisão..............: ' + formatDate2(xdataprisao) + '\n',
                    ' Data do fim da pena.....: ' + formatDate2(xdatafim) + '\n',
                ],
                color: 'blue',
                alignment: 'justify',
                fontSize: 14,
                bold: false,
                margin: [15, 20, 0, 0],
            },
            {
                text: [
                    ' Data da 1ª Progressão.: ' + formatDate2(xdataprogressao) + '\n',
                    ' Data da 2ª Progressão.: ' + formatDate2(xdataprogressao2) + '\n',
                    ' Data da Condicional.....: ' + formatDate2(xdatacondicional) + '\n',
                ],
                color: 'green',
                alignment: 'justify',
                fontSize: 14,
                bold: false,
                margin: [15, 0, 0, 0],
            },
            {
                text: [' Data da FALTA GRAVE..: ' + xdata + '\n\n',],
                color: 'red',
                alignment: 'justify',
                fontSize: 14,
                bold: false,
                margin: [15, 0, 0, 0],
            },
            { text: 'DELITOS \n' },
            {
                table: {
                    headerRows: 1,
                    widths: [100, '*', '*', '*', '*', '*', '*'],
                    body: [
                        [
                            { text: 'Descricao', style: 'tableHeader', fontSize: 8 },
                            { text: 'Pr/Rei', style: 'tableHeader', fontSize: 8 },
                            { text: 'Progressão', style: 'tableHeader', fontSize: 8 },
                            { text: 'Condicional', style: 'tableHeader', fontSize: 8 },
                            { text: 'Anos', style: 'tableHeader', fontSize: 8 },
                            { text: 'Meses', style: 'tableHeader', fontSize: 8 },
                            { text: 'Dias', style: 'tableHeader', fontSize: 8 }
                        ],
                        ...dados
                    ]
                },
                layout: 'headerLineOnly'
            },
            {
                text: 'REMIÇÃO/DETRAÇÃO \n',
                margin: [0, 15, 0, 0],
            },
            {
                table: {
                    headerRows: 1,
                    widths: [100, '*', '*', '*', '*', '*', '*'],
                    body: [
                        [
                            { text: 'Descricao', style: 'tableHeader', fontSize: 8 },
                            { text: 'Tipo', style: 'tableHeader', fontSize: 8 },
                            { text: 'Qtd. Informada', style: 'tableHeader', fontSize: 8 },
                            { text: 'Qtd. Calculada', style: 'tableHeader', fontSize: 8 },
                        ],
                        ...dados2
                    ]
                },
                layout: 'headerLineOnly'
            },

        ];

        function Rodape(currentPage, pageCount) {
            return [
                {
                    text: currentPage + ' / ' + pageCount,
                    alignment: 'right',
                    fontSize: 9,
                    margin: [0, 10, 20, 0]
                }
            ]

        }

        const docDefinitions = {
            pageSize: 'A4',
            pageMargins: [15, 50, 15, 40],

            header: [reportTitle],
            content: [details],
            footer: Rodape,
        }

        pdfMake.createPdf(docDefinitions).open();

    }

    function chamarelatorios() {
        var tipo = prompt("(1) - Relatório de progressão / (2) - Relatório 60 dias ou menos")
        if (tipo == '1') {
            gerarPDF()
        } else {
            gerarPDF2()
        }
    }

    function gerarPDF2() {

        pdfMake.vfs = pdfFonts.pdfMake.vfs;


        const reportTitle = [
            {
                text: [
                    'SISTEMA DE CONTROLE DE EXECUÇÃO PENAL' + '\n\n',
                ],
                fontSize: 14,
                alignment: 'center',
                bold: true,
                margin: [15, 20, 0, 45]
            }
        ];

        const dados = cliento?.map((cli) => {
            return [
                { text: cli.nome, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: cli.matricula, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: formatDate2(cli.dataprogressao), fontSize: 9, margin: [0, 2, 0, 2] },
                { text: formatDate2(cli.dataprogressao2), fontSize: 9, margin: [0, 2, 0, 2] },
                { text: formatDate2(cli.datacondicional), fontSize: 9, margin: [0, 2, 0, 2] },
            ]
        })

        const details = [
            {
                text: ['Relatório de progressões ou condicionais próximos a 60 dias' + '\n\n'],
                fontSize: 14,
                alignment: 'center',
                bold: true,
            },
            {
                table: {
                    headerRows: 1,
                    widths: [150, '*', '*', '*', '*'],
                    body: [
                        [
                            { text: 'Nome', style: 'tableHeader', fontSize: 8 },
                            { text: 'Matricula', style: 'tableHeader', fontSize: 8 },
                            { text: 'Progressão1', style: 'tableHeader', fontSize: 8 },
                            { text: 'Progressão2', style: 'tableHeader', fontSize: 8 },
                            { text: 'Condicional', style: 'tableHeader', fontSize: 8 },
                        ],
                        ...dados
                    ]
                },
                layout: 'headerLineOnly'
            },
        ];

        function Rodape(currentPage, pageCount) {
            return [
                {
                    text: currentPage + ' / ' + pageCount,
                    alignment: 'right',
                    fontSize: 9,
                    margin: [0, 10, 20, 0]
                }
            ]

        }

        const docDefinitions = {
            pageSize: 'A4',
            pageMargins: [15, 50, 15, 40],

            header: [reportTitle],
            content: [details],
            footer: Rodape,
        }

        pdfMake.createPdf(docDefinitions).open();

    }


    return (
        <Layout titulo="Sistema de Controle de Execução Penal"
            subtitulo="Cadastros de Clientes/Delitos/Remição e Detração"
            tipoHeight="h-full lg:h-screen">
            <h3>Cadastro de Clientes</h3>
            <main className="flex justify-center items-center">
                <form className="mr-1 w-full flex flex-col border-2 rounded
                lg:flex-row">
                    <div className="flex flex-col w-full p-1 
                    lg:w-3/6">
                        <div className="flex flex-col justify-between items-left">
                            <input type="text" className=" dark:bg-gray-400 dark:placeholder-white" placeholder="Buscar" onChange={buscar} />
                        </div>
                        <div className=" bg-blue-400 text-center border-2 h-20 overflow-auto">
                            {estabuscando ?
                                busca?.map(cli => {
                                    return (
                                        <div key={cli.nome} className="flex justify-start text-sm pl-1 pt-1 items-center">
                                            <a className="cursor-pointer mr-1 text-green-800" onClick={() => editar(cli)}>
                                                <TbSelect />
                                            </a>
                                            <a className="cursor-pointer mr-1 text-red-500" onClick={() => deletar(cli.nome)}>
                                                <TbTrashOff />
                                            </a>
                                            <p>{cli.nome}</p>
                                        </div>
                                    )
                                })
                                :
                                clienta?.map(cli => {
                                    return (
                                        <div key={cli.nome} className="flex justify-start text-sm pl-1 pt-1 items-center">
                                            <a className="cursor-pointer mr-1 text-green-800" onClick={() => editar(cli)}>
                                                <TbSelect />
                                            </a>
                                            <a className="cursor-pointer mr-1 text-red-500" onClick={() => deletar(cli.nome)}>
                                                <TbTrashOff />
                                            </a>
                                            <p>{cli.nome}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap items-center p-1 dark:text-white text-black justify-between" >
                        {atualizando ?
                            <label >Nome:
                                <input readOnly className="block dark:bg-gray-400 dark:placeholder-white" type="text" value={xnome} placeholder="Nome do cliente" onChange={event => setNome(event.target.value)} />
                            </label>
                            :
                            <label >Nome:
                                <input className="block dark:bg-gray-400 dark:placeholder-white" type="text" value={xnome} placeholder="Nome do cliente" onChange={event => setNome(event.target.value)} />
                            </label>
                        }
                        <label className="mt-2 sm:mt-0">Matrícula:
                            <input required className='block  dark:bg-gray-400 dark:placeholder-white w-auto' type="text" value={xmatricula} placeholder="Número de Matricula" onChange={event => setMatricula(event.target.value)} />
                        </label>
                        <label className="mt-2 sm:mt-0">Presídio:
                            <input className="block  dark:bg-gray-400 dark:placeholder-white w-auto" type="text" value={xpresidio} placeholder="Nome do Presídio" onChange={event => setPresidio(event.target.value)} />
                        </label>
                        <label className="mt-2 sm:mt-0">Processo Execução:
                            <input className='block dark:bg-gray-400 dark:placeholder-white w-auto' type="text" value={xprocesso} placeholder="Número do Processo" onChange={event => setProcesso(event.target.value)} />
                        </label>
                        <label className="mt-1 sm:mt-0">Data da Prisão:
                            <input className="block dark:bg-gray-400 w-auto" type="date" value={xdataprisao} placeholder="Data da prisão" onChange={event => setDataprisao(event.target.value)} />
                        </label>
                        <label className="mt-1 sm:mt-0">Progressão:
                            <input className="block dark:bg-gray-400 w-auto" type="date" value={xdataprogressao} placeholder="Data da progressão" onChange={event => setDataprogressao(event.target.value)} />
                        </label>
                        <label className="mt-1 sm:mt-0">Progressão2:
                            <input readOnly className="block dark:bg-gray-400 w-auto" type="date" value={xdataprogressao2} placeholder="Data da 2ª progressão" onChange={event => setDataprogressao2(event.target.value)} />
                        </label>
                        <label className="mt-1 sm:mt-0">Condicional:
                            <input readOnly className="block dark:bg-gray-400 w-auto" type="date" value={xdatacondicional} placeholder="Data da condicional" onChange={event => setDatacondicional(event.target.value)} />
                        </label>
                        <label className="mt-1 sm:mt-0">Término:
                            <input readOnly className="block dark:bg-gray-400 w-auto" type="date" value={xdatafim} placeholder="Data fim da pena" onChange={event => setDatafim(event.target.value)} />
                        </label>
                        <label className="mt-1 sm:mt-0">Falta Grave:
                            <input className="block dark:bg-gray-400 w-auto" type="date" value={xdatafalta} placeholder="Data falta grave" onChange={event => setDatafalta(event.target.value)} />
                        </label>
                    </div>
                </form>
            </main>
            {atualizando ?
                <div className="flex justify-center sm:justify-end flex-wrap">
                    <button className="cursor-pointer ml-3 w-32 mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={novo}>NOVO</button>
                    <button className="cursor-pointer ml-3 w-32 mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={atualizar}>ATUALIZAR</button>
                    <button className="cursor-pointer ml-3 w-32 mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={calculardatas}>CALCULAR</button>
                    <button className="cursor-pointer ml-3 w-32 mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={chamarelatorios}>Gerar PDF</button>
                </div>
                :
                <>
                    <div className="flex justify-end">
                        <button className="cursor-pointer w-24 mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={gravar}>GRAVAR</button>
                    </div>
                </>
            }

            {mostra ?
                <>
                    <h1 className="mt-4 sm:mt-0">Cadastro de Delitos</h1>
                    <form className="border-2 flex flex-col rounded
                    lg:flex-row sm:text-sm">
                        <div className=" bg-blue-400 text-center border-2 overflow-auto h-20 w-full">
                            {delita?.map(deli => {
                                return (
                                    <div key={deli.descriD} className="flex justify-start text-sm pl-1 pt-1 items-center">
                                        <a className="text-right mr-1 cursor-pointer font-bold text-green-800" onClick={() => editardelito(deli)}>
                                            <TbSelect />
                                        </a>
                                        <a className="text-right mr-1 cursor-pointer text-red-500" onClick={() => deletardelito(deli.descriD)}>
                                            <TbTrashOff />
                                        </a>
                                        <p className="text-left">{deli.descriD + " Prog. " + deli.percentual + " Cond. " + deli.fracao + " Pena " + deli.anosPena + " A " + deli.mesesPena + " M " + deli.diasPena + " D"}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-row flex-wrap justify-between items-center">
                            <label>Tipo de Crime
                                <select className='block  dark:bg-gray-400 w-full' value={xtipocrime} name="crimes" id="crimes" onChange={event => setTipocrime(event.target.value)}>
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
                        <button className="cursor-pointer w-32 self-center sm:self-end mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={atualizardelito}>ATUALIZAR</button>
                        :
                        <button className="cursor-pointer w-24 self-center sm:self-end mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={gravardelito}>GRAVAR</button>
                    }

                    <h1 className="mt-4 sm:mt-0">Cadastro de Detração e Remições</h1>
                    <form className="border-2 flex flex-col rounded
                    lg:flex-row">
                        <div className=" bg-blue-400 text-center border-2 overflow-auto h-20 w-full lg:w-2/5">
                            {remica?.map(remi => {
                                return (
                                    <div key={remi.descricao} className="flex justify-start sm:text-sm pl-1 pt-1 items-center">
                                        <a className="text-right mr-1 cursor-pointer font-bold text-green-800" onClick={() => editarremicao(remi)}>
                                            <TbSelect />
                                        </a>
                                        <a className="text-right mr-1 cursor-pointer text-red-500" onClick={() => deletarremicao(remi.descricao)}>
                                            <TbTrashOff />
                                        </a>
                                        <p className="text-left">{remi.descricao + " Inf. " + remi.qtdI + " Calc. " + remi.qtdC}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-row flex-wrap justify-between items-center w-full lg:w-3/5">
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
                    <div className="flex self-center sm:justify-end flex-wrap">
                        {atualizando3 ?
                            <button className="cursor-pointer w-32 mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={atualizarremicao}>ATUALIZAR</button>
                            :
                            <button className="cursor-pointer w-24 mt-3 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" onClick={gravarremicao}>GRAVAR</button>
                        }
                    </div>
                </>
                :
                <>
                </>
            }
        </Layout>
    )
}
