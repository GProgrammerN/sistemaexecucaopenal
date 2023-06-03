'use client';
import { createContext, useContext, useState } from 'react'
import firebase from '../../firebase/config'
import Usuario from '@/app/model/Usuario'
import router from 'next/router'

interface AuthContextProps{
    usuario: Usuario
    loginGoogle: () => Promise<void>
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

export function AuthProvider(props:any){
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function loginGoogle(){
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
        if(resp.user?.email){
            const usuario = await usuarioNormalizado(resp.user)
            pushA()
        }
    }
    return(
        <AuthContext.Provider value={{
            usuario,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

function pushA(){
    router.push('/')
}

export default AuthContext
export const useAuth = () => useContext(AuthContext)