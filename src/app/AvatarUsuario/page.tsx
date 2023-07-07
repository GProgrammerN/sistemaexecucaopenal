import { useAuth } from "@/data/context/AuthContext"

export default function AvatarUsuario() {
    const { usuario } = useAuth()

    return (
        <div className="hidden sm:flex flex-col items-center">
            <img
                src={usuario?.imageUrl ?? '/images/avatar.png'}
                alt="Avatar do usuário"
                className="h-10 w-10 rounded-full"
            />
            <p className="dark:text-white text-black text-sm">
                {usuario?.nome?.slice(0, 40) ?? 'Sem Apelido'}
            </p>

        </div>

    )

}