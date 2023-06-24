'use client';
import MenuLateral from "./MenuLateral"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import { useGlobalContext } from "@/data/context/AppContext";
import ForcarAutenticacao from "../auth/ForcarAutenticacao";


interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const {xtema, setXtema } = useGlobalContext();

    return(
        <ForcarAutenticacao>
        <div className={` ${xtema} flex h-screen w-screen`}>
            <MenuLateral />
            <div className={`flex flex-col w-full p-3
             bg-gray-300    dark:bg-gray-800`}>
                <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo}/>
                <Conteudo>
                    {props.children}
                </Conteudo>
            </div>
        </div>
        </ForcarAutenticacao>
    )
}