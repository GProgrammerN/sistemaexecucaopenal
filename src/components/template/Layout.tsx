'use client';
import MenuLateral from "./MenuLateral"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import { useGlobalContext } from "@/data/context/AppContext";
import ForcarAutenticacao from "../auth/ForcarAutenticacao";


interface LayoutProps {
    titulo: string
    subtitulo: string
    tipoHeight?: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const { xtema, setXtema } = useGlobalContext();

    return (
        <ForcarAutenticacao>
            <div className={`${xtema} flex overflow-auto`}>
                <MenuLateral />
                <div className={`flex flex-col p-3 max-h-full min-h-screen w-full
             bg-gray-300    dark:bg-gray-800`}>
                    <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Conteudo>
                        {props.children}
                    </Conteudo>
                </div>
            </div>
        </ForcarAutenticacao>
    )
}