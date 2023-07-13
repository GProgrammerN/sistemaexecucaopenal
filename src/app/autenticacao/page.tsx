'use client';

import { FcGoogle } from 'react-icons/fc'

import fundo from "../../../public/images/JusticaCalc2.jpg"
import Image from "next/image";
import { useState } from "react";
import AuthInput from "@/components/auth/AuthInput";
import { IconeAtencao } from "@/components/icons";
import { useAuth } from "@/data/context/AuthContext";
import { useRouter } from "next/navigation";
import firebase from '../../firebase/config'
import Cookies from "js-cookie";

export default function Autenticacao() {

    const { cadastrar, login, usuario, loginGoogle } = useAuth()

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [erro, setErro] = useState(null)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function exibirErro(msg: any, tempoSegundos = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempoSegundos * 1000)
    }

    function resetasenha() {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                //
                //            
            })
            .catch((error) => {
                var errorCode = error.code;
                var erro = error.message;
            })
    }

    async function submeter() {
        try {
            if (modo === 'login') {
                await login(email, senha)
            } else {
                await cadastrar(email, senha)
            }
        } catch (e: any) {

            if (e.code == 'auth/user-disabled') {
                exibirErro('O usuário informado está desabilitado.')
            } else if (e.code == 'auth/user-not-found') {
                exibirErro('O usuário informado não está cadastrado.')
            } else if (e.code == 'auth/invalid-email') {
                exibirErro('O domínio do e-mail informado é inválido.')
            } else if (e.code == 'auth/wrong-password') {
                exibirErro('A senha informada está incorreta.')
            } /*else {
                exibirErro('Erro desconhecido')
            }*/


        }
    }

    function gravar() {
        const db = firebase.firestore();
        var id = firebase.auth().currentUser?.uid
        var xemail = firebase.auth().currentUser?.email
        const referencia = db.collection('usuario/').doc(id)
        referencia.get()
            .then((doc) => {
                if (!doc.exists) {
                    var dataAtual = new Date();
                    var dia = dataAtual.getDate();
                    var mes = (dataAtual.getMonth() + 2);
                    var ano = dataAtual.getFullYear();
                    var validade = new Date(ano, mes, dia).toString()
                    db.collection('usuario/').doc(id).set({
                        email: xemail,
                        expira: validade,
                        assinatura: ''
                    })
                } else {
                    const dados = doc.data()
                    const obj = JSON.parse(JSON.stringify(dados))
                    var datae = obj.expira
                    var datar = new Date(datae)
                    var dataAtual = new Date()
                    var xassinatura = obj.assinatura
                    if (datar <= dataAtual && xassinatura !== 'true') {
                        alert("Validade do sistema expirada! Renove a assinatura.")
                        if (!Cookies.get('bloqueio')) {
                            Cookies.set('bloqueio', 'true')
                        }
                        window.location.assign('/assinatura')
                        /*                        useRouter().push('/assinatura')
                                                firebase.auth().signOut().then(() => {
                                                    //logout
                                                }).catch(() => {
                                                    //{logout}
                                                })*/
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    if (usuario) {
        gravar()
        useRouter().push('/')
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <Image src={fundo} alt='Fundo Padrão' className="h-screen w-full object-cover" />
            </div>
            <div className="m-20 w-full md:w-1/2 lg:w-1/3" >
                <div className='flex flex-col items-center'>
                    <img src='./images/LOGO 2.png' className='w-60'></img>
                    <h1 className={`text-2xl font-bold mt-3 mb-3 text-green-800 text-center`}>
                        Seja Bem Vindo ao Sistema de Execução Penal.
                    </h1>
                </div>
                {erro ? (
                    <div className={`
                        flex items-center
                        bg-red-400 text-white py-3 px-5 my-2
                        border-2 border-red-700 rounded-lg`}>
                        {IconeAtencao}
                        <span className={`ml-3`}>{erro}</span>
                    </div>
                ) : false}
                <button onClick={loginGoogle} className={`flex flex-row justify-center items-center
                     w-full bg-blue-400 hover:bg-blue-600
                      text-white rounded-lg px-4 py-3 font-bold
                     `}>
                    <img src='./images/google.png'></img>
                    Login com o Google
                </button>
                <h2 className='text-xl text-center text-green-600 font-bold mt-1'>
                    60 dias grátis para avaliação
                </h2>
            </div>
        </div>
    )
}