'use client';
import { createContext, useContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config'
import Usuario from '@/app/model/Usuario'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"

interface AuthContextProps{
    usuario: Usuario
    loginGoogle: () => Promise<void>
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
    const [carregando, setcarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function configurarSessao(usuarioFirebase) {
        if(usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setcarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setcarregando(false)
            return false
        }
    }

    async function loginGoogle(){
        try {
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
                configurarSessao(resp.user)
        
        } finally {
            setcarregando(false)
        }
    }

    async function logout() {
        try{
            setcarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setcarregando(false)
        }
    }

    useEffect(() => {
        const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
        return () => cancelar()
    })

    return(
        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext
export const useAuth = () => useContext(AuthContext)