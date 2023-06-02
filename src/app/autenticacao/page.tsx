'use client';
import { useState } from "react";
import AuthInput from "@/components/auth/AuthInput";

export default function Autenticacao() {

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function submeter() {
        if(modo === 'login') {
            console.log('login')
        } else {
            console.log('cadastrar')
        }    
    }

    return (
       <div className="flex h-screen items-center justify-center">
        <div className=" hidden md:block md:w-1/2 lg:w-2/3" >
            <img 
                src="https://media.istockphoto.com/id/1146468306/pt/foto/african-client-hand-sign-business-contract-at-meeting-closeup-view.jpg?s=1024x1024&w=is&k=20&c=G9oi9RFR-FEiQ7yoprkCpx7TdD9N_jOZ6CDXDdbBE2c="
                className="h-screen w-full object-cover"
            />
        </div>
        <div className="m-10 w-full md:w-1/2 lg:w-1/3" >
            <h1 className={`
                text-2xl font-bold mb-5
            `}>
                {modo === 'login' ? 'Entre com a sua Conta' : 'Cadastre-se na Plataforma '}

            </h1>
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

            <button onClick={submeter} className={`
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

        </div>
       </div>
    )
}