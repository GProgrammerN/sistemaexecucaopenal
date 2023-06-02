interface AuthInputProps {
    label: string
    valor: any
    obrigatorio?: boolean
    tipo?: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps) {
    return(
        <div className="flex flex-col mt-4">
            <label >{props.label}</label>
            <input 
                type={props.tipo ?? 'text'} 
                value={props.valor}
                onChange={e => props.valorMudou?.(e.target.value)}
                required={props.obrigatorio}
                className={`
                    px-4 py-3 rounded-lg bg-gray-800 mt-2
                    border focus:border-blue-500
                `}
            />
        </div>
    )
}