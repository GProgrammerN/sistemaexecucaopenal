import BotaoAlternarTema from "./BotaoAlternarTema"
import MenuLateral from "./MenuLateral"
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
            <div className={`flex flex-grow justify-end`}>
                <BotaoAlternarTema tema={xtema} alternarTema={setXtema}/>
            </div>
        </div>
    )
}