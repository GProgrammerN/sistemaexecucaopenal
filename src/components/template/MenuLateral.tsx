import { IconeAjutes, IconeCasa, IconeSino } from "../icons"
import MenuItem from "./MenuItem"
export default function MenuLateral(){
    return(
        <aside>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>

            </div>
            <ul>
            <MenuItem url='/' texto="Inicio" icone={IconeCasa} />
            <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjutes} />
            <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino} />

            </ul>
            
        </aside>
    )
}