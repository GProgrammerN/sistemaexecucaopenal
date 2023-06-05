"use client"
import Head from 'next/head'
import Image from 'next/image'
import loading from '../../../public/images/loading.gif'
import { useAuth } from '@/data/context/AuthContext'
import { useRouter } from 'next/navigation'


export default function ForcarAutenticacao(props:any){
    const {usuario, carregando} = useAuth()

    if(!carregando && usuario?.email){  
        return renderizarConteudo()

    } else if(carregando){
        return renderizarCarregando()
    } else {
        useRouter().push('/autenticacao')
        return null
    }
    function renderizarConteudo(){
        return(<>
        <Head>
            <script dangerouslySetInnerHTML={{
                __html:`
                    if(!document.cookie?includes("sistemaexecucaopenal-auth")){
                        window.location.href = "/autenticacao"
                    }`
            }}>
            </script>
        </Head>
        {props.children}
        </>)
    }
    function renderizarCarregando(){
        return(
            <div className={`
            flex justify-center items-center h-screen
            `}>
                <Image src={loading} alt="Carregando"></Image>
            </div>
        )
    }
}
