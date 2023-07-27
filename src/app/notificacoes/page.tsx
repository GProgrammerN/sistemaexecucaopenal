'use client';
import { useEffect } from "react";
import Conteudo from "@/components/template/Conteudo"
import Layout from "@/components/template/Layout"


export default function Notificacoes() {
  return (
    <Layout titulo="Notificações"
      subtitulo="Aqui você irá gerenciar as suas notificações!"
      tipoHeight="h-screen">
      <Conteudo children='O sistema encontra-se em sua primeira versão: é totalmente funcional e está sempre em constante atualização. As melhorias e aperfeiçoamentos, quando houverem, serão informados nesta tela. Bem como eventuais manutenções e interrupções, se houverem.' />
      <Conteudo children=' ' />
      <Conteudo children='Quaisquer dúvidas ou solicitações podem ser feitas através do email: enio.perfil@gmail.com. Em breve divulgaremos WhatsApp para atendimento. ' />
      <Conteudo children=' ' />
      <Conteudo children='25/07/2023 - O botão Gerar PDF agora possibilita 2 tipos de relatórios, a ficha dos clientes com as datas das possíveis progressões e também um relatório com os clientes com possíveis progressões e livramento condicional nos próximos 60 dias ou menos, bastando digitar 1 ou 2 e ENTER.' />
    </Layout>
  )
}
