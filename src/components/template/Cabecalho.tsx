import AvatarUsuario from "@/app/AvatarUsuario/page"
import BotaoAlternarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"
import { useGlobalContext } from "@/data/context/AppContext"


interface CabecalhoProps {
    titulo: string
    subtitulo: string
   
}

export default function Layout(props: CabecalhoProps) {
    const {xtema, setXtema } = useGlobalContext();

    return(
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className={`flex flex-grow justify-end items-center`}>
                <BotaoAlternarTema />
                <AvatarUsuario />
            </div>
        </div>
    )
}