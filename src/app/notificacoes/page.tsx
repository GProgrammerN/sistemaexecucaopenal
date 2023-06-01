'use client';
import { useEffect } from "react";
import { useGlobalContext } from "@/data/context/AppContext";


import Layout from "@/components/template/Layout"
import useAppData from "@/data/hook/UseAppData"


export default function Notificacoes() {
  const {xtema, setXtema } = useGlobalContext();

  function AlternarTema () 
    { setXtema(xtema === '' ? 'dark' : '')}
  
      return (
      <Layout titulo="Notificações" 
        subtitulo="Aqui você irá gerenciar as suas notificações!">
          <button onClick={AlternarTema}>Alternar tema</button>
          <h3>{xtema}</h3>
      </Layout>
    )
}
