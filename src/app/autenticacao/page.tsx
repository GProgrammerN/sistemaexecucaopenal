'use client';

import fundo from "../../../public/images/JusticaCalc.jpg"
import Image from "next/image";
import { useState } from "react";
import AuthInput from "@/components/auth/AuthInput";
import { IconeAtencao } from "@/components/icons";
import { useAuth } from "@/data/context/AuthContext";
import { useRouter } from "next/navigation";
import firebase from '../../firebase/config'

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
                    var mes = (dataAtual.getMonth() + 1);
                    var ano = dataAtual.getFullYear();
                    var validade = new Date(ano, mes, dia).toString()
                    db.collection('usuario/').doc(id).set({
                        email: xemail,
                        expira: validade
                    })
                } else {
                    const dados = doc.data()
                    const obj = JSON.parse(JSON.stringify(dados))
                    var datae = obj.expira
                    var datar = new Date(datae)
                    var dataAtual = new Date()
                    if (datar <= dataAtual) {
                        alert("Validade do sistema expirada! Renove a assinatura.")
                        firebase.auth().signOut().then(() => {
                            //logout
                        }).catch(() => {
                            //{logout}
                        })
                    }
                }
            })
            .catch ((error) => {
                console.error(error);
            });
    }


if (usuario) {
    gravar()
    useRouter().push('/')
}

return (
    <div className="flex h-screen items-center justify-center">
        <div className=" hidden md:block md:w-1/2 lg:w-2/3" >
            <Image src={fundo} alt='Fundo Padrão' className="h-screen w-full object-cover" />
        </div>
        <div className="m-10 w-full md:w-1/2 lg:w-1/3" >
            <h1 className={`
                text-2xl font-bold mb-5
            `}>
                {modo === 'login' ? 'Entre com a sua Conta' : 'Cadastre-se na Plataforma '}

            </h1>

            {erro ? (

                <div className={`
            flex items-center
            bg-red-400 text-white py-3 px-5 my-2
            border-2 border-red-700 rounded-lg`}>
                    {IconeAtencao}
                    <span className={`ml-3`}>{erro}</span>
                </div>
            ) : false}

            <AuthInput
                label="Email"
                tipo="email"
                valor={email}
                valorMudou={setEmail}
                obrigatorio
            />
            <AuthInput
                label="Senha"
                tipo="password"
                valor={senha}
                valorMudou={setSenha}
                obrigatorio
            />
            <button onClick={submeter} className={`
                w-full bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg px-4 py-3 mt-6
            `}>
                {modo === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>

            <hr className="my-6 border-gray-300 w-f" />

            <button onClick={loginGoogle} className={`
                w-full bg-red-500 hover:bg-red-400
                text-white rounded-lg px-4 py-3
            `}>
                Entrar com o Google
            </button>

            {modo === 'login' ? (
                <p className="mt-8">
                    Novo por aqui?
                    <a onClick={() => setModo('cadastro')} className={`
                    text-blue-500 hover:text-blue-700 font-semibold
                    cursor-pointer
                    `}> Crie uma Conta Gratuitamente</a>
                </p>
            ) : (
                <p className="mt-8">
                    Ja é usuário da Plataforma?
                    <a onClick={() => setModo('login')} className={`
                    text-blue-500 hover:text-blue-700 font-semibold
                    cursor-pointer
                    `}> Efetue o seu Login</a>
                </p>

            )}
            <p>
                <a onClick={resetasenha} className="text-purple-700 hover:text-purple-500 font-semibold cursor-pointer"> Esqueceu sua senha</a>
            </p>

        </div>
    </div>
)
}