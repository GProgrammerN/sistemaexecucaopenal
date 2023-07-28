'use client';
import Layout from "@/components/template/Layout"
import { FormEvent, useEffect, useState } from "react"
import firebase from '../../firebase/config'
import { differenceInDays } from "date-fns";
import emailjs from "@emailjs/browser"
var usuarios = [{}]
usuarios.shift()

type Usuarios = {
    user: string,
    email: string,
    assinatura: string,
    expira: string
}

var clientes = [{}]
clientes.shift()

var clientes2 = [{}]
clientes2.shift()

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

export default function Home() {
    const serviceId  = "service_zbyy5yp"
    const templateId = "template_mlj4cpu" 

    emailjs.init('Rtk3sJJY32T9F-kZY')


    // Clientes

    const db = firebase.firestore()

    const [cliento, setCliento] = useState<Cliente[]>()

    const [usuario, setUsuario] = useState<Usuarios[]>()


    var id = firebase.auth().currentUser?.uid

    function usuariosf() {
        db.collection("usuario").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var x = doc.data()
                    usuarios.push(x)
                });
                setUsuario(usuarios)
                usuarios = []
            }
            )
        console.log(usuarios)
    }

    function buscar(vid: string, mail: string){
       db.collection("usuario/" + vid + "/clientes/").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var y = doc.data()
/*                    const obj = JSON.parse(JSON.stringify(y))
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
                if (d1 <= 60 && d1 >= 0 || d2 <= 60 && d2 >= 0 || d3 <= 60 && d3 >= 0) {*/
                    clientes2.push(y)
//                    }
            });
            setCliento(clientes2)
//            console.log(clientes2)
            disparaemail(clientes2, mail)

            clientes2 = []
        })
        return
    }


    function clientesf() {
        var tamanho = usuario?.length
        for(let contador=0; contador < tamanho; contador ++ ){
           var { user, email } = usuario[contador];
           buscar(user, email)
        }
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

    function disparaemail(cli: Object, xmail: string){
        var xmessage = "" 
        const obj = JSON.parse(JSON.stringify(cli))
        console.log(xmail,obj)
        obj?.map((ob) => {
             xmessage = xmessage + ob.nome+ " "+ob.presidio+" "+ob.matricula+" "+ob.processo+" "+formatDate2(ob.progressao)+" "+formatDate2(ob.progressao2)+" "+formatDate2(ob.condicional)+"\n"
        })
        emailjs.send(serviceId, templateId, {email: xmail, message: xmessage })
    }

    return (
        <Layout titulo="Sistema de Controle de Execução Penal"
            subtitulo="Cadastros de Clientes/Delitos/Remição e Detração"
            tipoHeight="h-full lg:h-screen">
            <h3>Cadastro de Clientes</h3>
            <main className="flex justify-center items-center">
                <form className="mr-1 w-full flex flex-col border-2 rounded lg:flex-row">
                    <div className="flex flex-col w-full p-1 lg:w-3/6">
                        <button type="button" onClick={usuariosf}>USUARIOS</button>            
                        <button type="button" onClick={clientesf}>CLIENTES</button>            
                    </div>
                </form>
            </main>
        </Layout>
    )
}