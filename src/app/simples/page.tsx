'use client';
import Layout from "@/components/template/Layout"

export default function Home() {
  return (
    <Layout titulo="Como utilizar Sistema de Cálculo de Execução Penal"
      subtitulo="Aqui você encontrará vídeos e tutoriais sobre como utilizar e obter melhor aproveitamento do sistema de cálculos de execução penal."
      tipoHeight="h-screen">
      <div className="flex text-lg text-center  justify-around flex-wrap
      underline decoration-purple-700
      dark:text-blue-400 dark:decoration-white
      sm:hidden">
        <a href="https://www.youtube.com/watch?v=5PsZCNBQjLI">Como cadastrar Clientes?</a>
        <a href="https://www.youtube.com/watch?v=KAjhaQs_P2k">Como cadastrar Delitos?</a>
        <a href="https://www.youtube.com/watch?v=5PsZCNBQjLI">Como cadastrar Remições/Detrações?</a>
        <a href="https://www.youtube.com/watch?v=VmyoPEfsQcs">Cálculo de Pena, Falta Grave e Gerar PDF</a>
      </div>
      <div className="flex justify-evenly flex-wrap">
        <iframe className="hidden sm:flex mt-5 border" width="370" height="208" src="https://www.youtube.com/embed/5PsZCNBQjLI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <iframe className="hidden sm:flex mt-5 border" width="370" height="208" src="https://www.youtube.com/embed/KAjhaQs_P2k" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <iframe className="hidden sm:flex mt-5 border" width="370" height="208" src="https://www.youtube.com/embed/r7WEHTNrpA4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <iframe className="hidden sm:flex mt-5 border" width="370" height="208" src="https://www.youtube.com/embed/VmyoPEfsQcs" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    </Layout>
  )
}
