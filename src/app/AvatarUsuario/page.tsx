import { useAuth } from "@/data/context/AuthContext"
import Link from "next/link"

export default function AvatarUsuario() {
    const { usuario } = useAuth()

return(
    <div className="flex flex-col">
        <Link href="/perfil">
            <img 
                src = {usuario?.imageUrl ?? '/images/avatar.png'}
                alt = "Avatar do usuário"
                className="h-10 w-10 rounded-full cursor-pointer ml-3"
                />
        </Link>
        <p className="text-white text-sm">
            {usuario?.nome ?? 'No Name'}
        </p>
    
    </div>

)

}