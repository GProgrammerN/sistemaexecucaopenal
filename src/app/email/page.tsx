'use client';
import Layout from "@/components/template/Layout"
import { FormEvent, useEffect, useState } from "react"
import firebase from '../../firebase/config'

var clientes = [{}]
//clientes.shift()

var usuarios = [{}]
//usuarios.shift()*/

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

type Usuario = {
    user: string,
    email: string
}

export default function Home() {


    //Usuarios
    const [uid, setId] = useState('')
    const [xemail, setEmail] = useState('')

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
    var id = firebase.auth().currentUser?.uid

    const [status, setStatus] = useState(false)

    const [atualizando, setAtualizando] = useState(false)

    const [busca, setBusca] = useState<Cliente[]>()
    const [clienta, setClienta] = useState<Cliente[]>()
    const [usuario, setUsuario] = useState<Usuario[]>()

    function buscausuarios() {
        db.collection("usuario").where("email", "!=", '')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var usuario = doc.data()
                    usuarios.push(usuario)
                });
                setUsuario(usuarios)
//                usuarios = []
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        console.log(usuarios)
    }

    function buscaclientes() {
        usuarios?.map(function(usu) {
            return (
                db.collection("usuario/" + usu.user + "/clientes/").get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            var x = doc.data()
                            const obj = JSON.parse(JSON.stringify(x))
                            var datap1 = obj.dataprogressao
                            var datap2 = obj.dataprogressao2
                            var datalc = obj.datacondicional
                            var datar1 = new Date(datap1)
                            var datar2 = new Date(datap2)
                            var datarc = new Date(datalc)
                            var dataAtual = new Date()

                            let c1 = Math.abs(dataAtual.getTime() - datar1.getTime())
                            let d1 = Math.ceil(c1 / (1000 * 3600 * 24))

                            let c2 = Math.abs(dataAtual.getTime() - datar2.getTime())
                            let d2 = Math.ceil(c2 / (1000 * 3600 * 24))

                            let c3 = Math.abs(dataAtual.getTime() - datarc.getTime())
                            let d3 = Math.ceil(c3 / (1000 * 3600 * 24))


                            if (c1 <= 60 && c2 <= 60 && c3 <= 60) {
                                clientes.push(x)
                            }
                        });
                        setClienta(clientes)
                        clientes = []
                    }
                    )
            )
        })
        console.log(usuarios)
        console.log(clientes)
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
        d.setDate(d.getDate() + 1)

        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
        var year = d.getFullYear()
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }


    return (
        <Layout titulo="Sistema de Controle de Execução Penal"
            subtitulo="Envio de emails data da progressão"
            tipoHeight="h-full lg:h-screen">
            <div>
                <button onClick={buscausuarios}>Busca usuarios</button>
                <button onClick={buscaclientes}>Busca clientes</button>
            </div>
        </Layout>
    )
}
