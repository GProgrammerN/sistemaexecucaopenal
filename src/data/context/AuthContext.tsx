'use client';
import { createContext, useContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config'
import Usuario from '@/app/model/Usuario'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface AuthContextProps{
    usuario?: Usuario
    carregando?: boolean
    login: (email:string, senha:string) => Promise<void>
    cadastrar: (email:string, senha:string) => Promise<void>    
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User){
    const token = await usuarioFirebase.getIdToken()
    return{
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imageUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if(logado){
        Cookies.set('sistemaexecucaopenal-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('sistemaexecucaopenal-auth')
    }

}

export function AuthProvider(props:any){
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function configurarSessao(usuarioFirebase:any) {
        if(usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login(email:string, senha:string){
        try {
            const resp = await firebase.auth().
            signInWithEmailAndPassword(email, senha)

                await configurarSessao(resp.user)
                useRouter().push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email:string, senha:string){
        try {
            const resp = await firebase.auth().
            createUserWithEmailAndPassword(email, senha)

            await configurarSessao(resp.user)
            useRouter().push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function loginGoogle(){
        try {
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
                await configurarSessao(resp.user)
//                useRouter().push('/')
            
        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try{
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if(Cookies.get('sistemaexecucaopenal-auth')){
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    })

    return(
        <AuthContext.Provider value={{
            usuario,
            carregando,
            login,
            cadastrar,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext
export const useAuth = () => useContext(AuthContext)