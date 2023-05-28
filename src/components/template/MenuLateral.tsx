import { IconeAjutes, IconeCasa } from "../icons"
import MenuItem from "./MenuItem"
export default function MenuLateral(){
    return(
        <aside>
            <ul>
            <MenuItem url='/' texto="Inicio" icone={IconeCasa} />
            <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjutes} />
            </ul>
            
        </aside>
    )
}