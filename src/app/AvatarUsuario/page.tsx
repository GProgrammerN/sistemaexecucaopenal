import { useAuth } from "@/data/context/AuthContext"
import Link from "next/link"

export default function AvatarUsuario() {
    const { usuario } = useAuth()

return(
    <div className="hidden sm:flex flex-col items-center">
        <Link href="/perfil">
            <img 
                src = {usuario?.imageUrl ?? '/images/avatar.png'}
                alt = "Avatar do usuário"
                className="h-10 w-10 rounded-full cursor-pointer ml-3"
                />
        </Link>
        <p className="dark:text-white text-black text-sm">
        {usuario?.nome.slice(0, 15) ?? 'Sem Apelido'}
        </p>
    
    </div>

)

}