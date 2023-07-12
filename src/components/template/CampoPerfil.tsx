interface CampoProps {
    campo: string,
    placeholder: string,
    id: string,
    type: string,
    botaovalor: boolean,
    funcao?: any,
    funcaoInput?: any
}

export default function CampoPerfil(props: CampoProps) {

    return (
        <div className="sm:flex sm:items-center border-b w-80 mb-2 border-teal-500 py-2" >
            <label htmlFor={props.id} className="dark:text-white text-black pr-4" >
                {props.campo}
                <input autoComplete="false" className="appearance-none bg-transparent border-none text-gray-300 py-1 px-2 leading-tight focus:outline-none"
                    type={props.type} placeholder={props.placeholder} id={props.id} onChange={props.funcaoInput} />
            </label>
            {props.botaovalor ?
                <button className="flex-shrink-1 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button" onClick={props.funcao}>Salvar</button>

                : <button className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button" onClick={props.funcao}>Alterar</button>}
        </div>
    )
}