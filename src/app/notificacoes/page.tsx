'use client';
import { useEffect } from "react";
import Conteudo from "@/components/template/Conteudo"
import Layout from "@/components/template/Layout"


export default function Notificacoes() {
  return (
    <Layout titulo="Notificações"
      subtitulo="Aqui você irá gerenciar as suas notificações!"
      tipoHeight="h-screen">
      <Conteudo children='Aqui você verá o conteúdo!' />
    </Layout>
  )
}
