'use client';
import { useEffect, useState } from "react"
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

var vez = 1
var veze = 1


export default function Home() {

    async function loga(){
        const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
    } 
    

    const serviceId = process.env.EMAILJSSERVICEID as string
    const templateId = process.env.EMAILJSTEMPLATEID as string

    emailjs.init(process.env.EMAILJSINITCODE as string)


    useEffect(() => {
        loga()
        if(veze==1){
            veze = 2
        }
    },[veze] )

    useEffect(() => {

        setTimeout(() =>{
            usuariosf()
            clientesf()
        }, 5000)


        if (vez == 1) {
            vez = 2
        }
        window.close()
    }, [vez])

    // Clientes

    const db = firebase.firestore()

    const [usuario, setUsuario] = useState<Usuarios[]>()

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

    function buscar(vid: string, mail: string) {
        db.collection("usuario/" + vid + "/clientes/").get()
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
                disparaemail(clientes2, mail)
                clientes2 = []
            })
        return
    }


    function clientesf() {
        var tamanho = usuario?.length
        for (let contador = 0; contador < tamanho; contador++) {
            var { user, email } = usuario[contador];
            buscar(user, email)
        }
    }


    function disparaemail(cli: Object, xmail: string) {
        var xmessage = ""
        const obj = JSON.parse(JSON.stringify(cli))
        console.log(xmail, obj)
        obj?.forEach(ob => {
            xmessage = xmessage + ob.nome + " " + ob.presidio + " " + ob.matricula + " " + ob.processo + " 1ª Progressão: " + formatDate2(ob.dataprogressao) + " 2ª Progressão: " + formatDate2(ob.dataprogressao2) + " Condicional: " + formatDate2(ob.datacondicional) + "\n"
        })
        if (xmessage != "") {
            emailjs.send(serviceId, templateId, { email: xmail, message: xmessage })
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

    return (
        <main className="flex justify-center items-center">
            <form >
                <div className="flex flex-col w-full h-full">
                    <button className="border-2 rounded" type="button" onClick={usuariosf}>USUARIOS</button>
                    <button className="border-2 rounded" type="button" onClick={clientesf}>DISPARAR EMAIL</button>
                </div>
            </form>
        </main>
    )
}