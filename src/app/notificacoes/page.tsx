'use client';
import { useEffect } from "react";
import Conteudo from "@/components/template/Conteudo"
import Layout from "@/components/template/Layout"


export default function Notificacoes() {
  return (
    <Layout titulo="Notificações"
      subtitulo="Aqui você irá gerenciar as suas notificações!"
      tipoHeight="h-screen">
      <Conteudo children='O sistema encontra-se em sua primeira versão, É totalmente funcional e está sempre em constante atualização.' />
      <Conteudo children='Melhorias e aperfeiçoamentos que houverem serão informados nesta tela, Bem como eventuais manutenções e interrupções se houverem serão previamente informadas aqui.' />
      <Conteudo children=' ' />
      <Conteudo children='25/07/2023 - o botão gerar pdf agora possibilita 2 tipos de relatórios, a ficha do clientes com as datas das possíveis progressões e também um relatório com os clientes com possíveis progressões e livramento condicional nos próximos 60 dias ou menos bastanto digitar 1 ou 2 e ENTER.' />      
    </Layout>
  )
}
