'use client';
import { useAuth } from "@/data/context/AuthContext";
import { IconeAjutes, IconeCasa, IconeSair, IconeSino } from "../icons"
import Logo from "./Logo"
import MenuItem from "./MenuItem"

export default function MenuLateral() {
    const { logout } = useAuth()
    return (
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900 dark:text-gray-200
            `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-gray-800 to-purple-900
                h-20 w-20`}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url='/' texto="Inicio" icone={IconeCasa} />
                <MenuItem url="/perfil" texto="Ajustes" icone={IconeAjutes} />
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino} />
                <MenuItem url="/calculadora" texto="Calculadora"/>
            </ul>
            <ul>
                <MenuItem
                    texto="Sair" icone={IconeSair}
                    className={`
                      text-red-600 dark:text-red-400 
                      hover:bg-red-400
                      hover:text-white dark:hover:text-white
                    `}
                    onClick={logout}
                />
            </ul>

        </aside>
    )
}

//onClick={() => console.log('logout')} -> está dando erro se coloca no MenuItem do Sair