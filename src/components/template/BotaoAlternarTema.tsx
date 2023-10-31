'use client';
import { useEffect } from "react";
import { useGlobalContext } from "@/data/context/AppContext";
import { IconeLua, IconeSol } from "../icons"

export default function BotaoAlternarTema(){

    const {xtema, setXtema } = useGlobalContext();

    function AlternarTema (){
        setXtema(xtema === '' ? 'dark' : '')
        const novoTema = xtema === '' ? 'dark' : ''
        localStorage.setItem('xtema', novoTema)
    }
  
    useEffect(() => {
        const temaSalvo = localStorage.getItem('xtema')
        setXtema(temaSalvo)
    }, [])

    return (

        xtema === 'dark' ? (
        <div onClick={AlternarTema} className={`
            hidden sm:flex items-center cursor-pointer
            bg-gradient-to-r from-yellow-300 to-yellow-600
            w-14 lg:w-24 h-8 p-1 rounded-full
        `}>
            <div className={`
                flex items-center justify-center
                bg-white text-yellow-600 w-6 h-6 rounded-full
            `}>
                {IconeSol}
            </div>
            <div className={`
                hidden lg:flex items-center ml-3
                text-white
            `}>
                <span >Claro</span>
            </div>
        </div>
    ) : (
        <div onClick={AlternarTema} className={`
            hidden sm:flex items-center justify-end cursor-pointer
            bg-gradient-to-r from-gray-500 to-gray-900
            w-14 lg:w-24 h-8 p-1 rounded-full
        `}>
            <div className={`
                hidden lg:flex items-center mr-2
                text-gray-300
            `}>
                <span >Escuro</span>
            </div>
            <div className={`
                flex items-center justify-center
                bg-black text-yellow-300 w-6 h-6 rounded-full
            `}>
                {IconeLua}
            </div>
        </div>
    )
    
    )
}