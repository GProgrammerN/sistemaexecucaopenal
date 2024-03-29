'use client';
import { useAuth } from "@/data/context/AuthContext";
import { IconeAssinatura, IconeCalculadora, IconeAjuda, IconeSair, IconeSino, IconeAi } from "../icons"
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
                <MenuItem url="/" texto="Simplificada" icone={IconeCalculadora} />
                <MenuItem url="/calculadora" texto="Completa" icone={IconeCalculadora} />
                <MenuItem url="/ai" texto="ChatGPT" icone={IconeAi} />
                <MenuItem url="/assinatura" texto="Assinatura" icone={IconeAssinatura} />
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino} />
                <MenuItem url='/simples' texto="Ajuda" icone={IconeAjuda} />
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