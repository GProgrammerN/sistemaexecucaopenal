'use client';
import Layout from "@/components/template/Layout"

export default function Home() {
  return (
    <Layout titulo="Como utilizar Sistema de Cálculo de Execução Penal"
      subtitulo="Aqui você encontrará vídeos e tutoriais sobre como utilizar e obter melhor aproveitamento do sistema de cálculos de execução penal."
      tipoHeight="h-screen">
      <div className="flex text-lg text-center underline text-blue-400 decoration-white justify-around flex-wrap">
        <a className="flex sm:hidden" href="https://www.youtube.com/watch?v=5PsZCNBQjLI">Como cadastrar Clientes?</a>
        <a className="flex sm:hidden" href="https://www.youtube.com/watch?v=KAjhaQs_P2k">Como cadastrar Delitos?</a>
        <a className="flex sm:hidden" href="https://www.youtube.com/watch?v=5PsZCNBQjLI">Como cadastrar Remições/Detrações?</a>
        <iframe className="hidden sm:flex" width="560" height="315" src="https://www.youtube.com/embed/5PsZCNBQjLI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <iframe className="hidden sm:flex" width="560" height="315" src="https://www.youtube.com/embed/KAjhaQs_P2k" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <iframe className="hidden sm:flex" width="560" height="315" src="https://www.youtube.com/embed/r7WEHTNrpA4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    </Layout>
  )
}
