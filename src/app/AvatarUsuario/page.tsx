import { useAuth } from "@/data/context/AuthContext"
import Link from "next/link"

export default function AvatarUsuario() {
    const { usuario } = useAuth()

return(
    <Link href="/perfil">
        <img 
            src = {usuario?.imageUrl ?? '/images/avatar.png'}
            alt = "Avatar do usuário"
            className="h-10 w-10 rounded-full cursor-pointer ml-3"
        />
    </Link>
)

}