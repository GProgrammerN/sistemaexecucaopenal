'use client';
import { useEffect } from "react";
import Conteudo from "@/components/template/Conteudo"
import Layout from "@/components/template/Layout"


export default function Notificacoes() {
  return (
    <Layout titulo="Notificações"
      subtitulo="Aqui você irá gerenciar as suas notificações!"
      tipoHeight="h-screen">
      <Conteudo children='O sistema encontra-se em sua primeira versão.' />
      <Conteudo children='É totalmente funcional, porém está sempre em constante atualização.' />
      <Conteudo children='Melhorias e aperfeiçoamentos que houverem serão abordados nesta tela.' />
      <Conteudo children='Bem como eventuais manutenções e interrupções se houverem serão previamente informadas aqui.' />
    </Layout>
  )
}
