export default function AssinaturaOpcoes() {
    return (
        <>
            <head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </head>
            <div className="flex justify-center items-center">
                <div className="">
                    <div className="text-center font-semibold">
                        <h1 className="text-5xl">
                            <span className="text-blue-700 tracking-wide">Assinaturas </span>
                            <span>Recorrentes</span>
                        </h1>
                        <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                            Escolha a assinatura que mais se adequar<br /> a você.
                        </p>
                    </div>
                    <div className="pt-24 flex flex-row">
                        <div className="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl">
                            <h1 className="text-black font-semibold text-2xl">Mensal</h1>
                            <p className="pt-2 tracking-wide">
                                <span className="text-gray-400 align-top">R$ </span>
                                <span className="text-3xl font-semibold text-black">30</span>
                                <span className="text-gray-400 font-medium">/mês</span>
                            </p>
                            <hr className="mt-4 border-1" />
                            <div className="pt-8">
                                <p className="font-semibold text-gray-400 text-left">
                                    <span className="material-icons align-middle">
                                        done
                                    </span>
                                    <span className="pl-2">
                                        <span className="text-black">Acesso a Calculadora de Execução Penal</span>
                                    </span>
                                </p>
                                <p className="font-semibold text-gray-400 text-left pt-5">
                                    <span className="material-icons align-middle">
                                        done
                                    </span>
                                    <span className="pl-2">
                                        <span className="text-black">Suporte Garantido</span>
                                    </span>
                                </p>
                                <a href="#" className="">
                                    <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                                        <span className="font-medium">
                                            Assinar Plano
                                        </span>
                                        <span className="pl-2 material-icons align-middle text-sm">
                                            east
                                        </span>
                                    </p>
                                </a>
                            </div>
                        </div>

                        <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
                            <h1 className="text-white font-semibold text-2xl">Semestral</h1>
                            <p className="pt-2 tracking-wide">
                                <span className="text-gray-400 align-top">R$ </span>
                                <span className="text-3xl font-semibold">150</span>
                                <span className="text-gray-400 font-medium">/semestre</span>
                            </p>
                            <hr className="mt-4 border-1 border-gray-600" />
                            <div className="pt-8">
                                <p className="font-semibold text-gray-400 text-left">
                                    <span className="material-icons align-middle">
                                        done
                                    </span>
                                    <span className="pl-2">
                                        <span className="text-white">Acesso a Calculadora de Execução Penal</span>
                                    </span>
                                </p>
                                <p className="font-semibold text-gray-400 text-left pt-5">
                                    <span className="material-icons align-middle">
                                        done
                                    </span>
                                    <span className="pl-2">
                                        <span className="text-white">Suporte Garantido</span>
                                    </span>
                                </p>
                                <a href="#" className="">
                                    <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                                        <span className="font-medium">
                                            Assinar Plano
                                        </span>
                                        <span className="pl-2 material-icons align-middle text-sm">
                                            east
                                        </span>
                                    </p>
                                </a>
                            </div>
                            <div className="relative top-4">
                                <p className="bg-green-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">17% de Desconto</p>
                            </div>

                        </div>

                        <div className="w-96 p-8 bg-white text-center rounded-3xl pl-16 shadow-xl">
                            <h1 className="text-black font-semibold text-2xl">Anual</h1>
                            <p className="pt-2 tracking-wide">
                                <span className="text-gray-400 align-top">R$ </span>
                                <span className="text-3xl text-black font-semibold">240</span>
                                <span className="text-gray-400 font-medium">/ano</span>
                            </p>
                            <hr className="mt-4 border-1" />
                            <div className="pt-8">
                                <a href="#" className="">
                                    <p className="font-semibold text-gray-400 text-left">
                                        <span className="material-icons align-middle">
                                            done
                                        </span>
                                        <span className="pl-2">
                                            <span className="text-black">Acesso a Calculadora de Execução Penal</span>
                                        </span>
                                    </p>
                                    <p className="font-semibold text-gray-400 text-left pt-5">
                                        <span className="material-icons align-middle">
                                            done
                                        </span>
                                        <span className="pl-2">
                                            <span className="text-black">Suporte Garantido</span>
                                        </span>
                                    </p>
                                    <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                                        <span className="font-medium">
                                            Assinar Plano
                                        </span>
                                        <span className="pl-2 material-icons align-middle text-sm">
                                            east
                                        </span>
                                    </p>
                                </a>
                            </div>
                            <div className="relative top-4">
                                <p className="bg-green-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">33% de Desconto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}