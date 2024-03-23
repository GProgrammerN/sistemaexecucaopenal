// pages/index.js

"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/template/Layout";
import firebase from "../../firebase/config";
import { TbSelect } from "react-icons/tb";
import { useCompletion } from "ai/react";

var prompts = [{}];
prompts.shift();

type Prompt = {
  id: string;
  prompt: string;
};

export default function Ai() {
  const [pdfContent, setPdfContent] = useState("");
  const [promptMessage, setPromptMessage] = useState("");
  const [aiText, setAiText] = useState("");
  const db = firebase.firestore();
  const [prompete, setPrompete] = useState("");
  const [processando, setProcessando] = useState(false);
  const [descricao, setDescricao] = useState("");

  const [busca, setBusca] = useState<Prompt[]>();
  const [estabuscando, setEstabuscando] = useState(false);
  const [prompta, setPrompta] = useState<Prompt[]>();

  const { input, completion, isLoading, handleInputChange, handleSubmit } =
    useCompletion({
      api: "/api/completion",
      body: { promptMessage },
    });

  useEffect(() => {
    db.collection("/areas/penal/prompts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var x = doc.data();
          prompts.push(x);
        });

        setPrompta(prompts);
        prompts = [];
      });
  }, []);

  useEffect(() => {
    setPromptMessage(prompete.replace("{transcription}", pdfContent));
  }, [prompete]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPdfContent(data.text);
      }
    }
  };

  function editar(ref: string, ide: string) {
    setPrompete(ref);
    setDescricao(ide);
  }

  function buscar(event: FormEvent) {
    const palavra = event.target.value;
    if (palavra != "") {
      setEstabuscando(true);
      const dados = new Array();
      prompta?.map((pro) => {
        const regra = new RegExp(event.target.value, "gi");
        if (regra.test(pro.id)) {
          dados.push(pro);
        }
      });
      setBusca(dados);
    } else {
      setEstabuscando(false);
    }
  }

  return (
    <Layout
      titulo="Chat GPT"
      subtitulo="Aqui você irá utilizar a IA ChatGPT para auxiliá-lo no seu dia a dia!"
      tipoHeight="h-screen"
    >
      <form onSubmit={handleSubmit}>
        <div
          className="flex rounded-md 
          flex-col
        text-white
        dark:text-black dark:placeholder-white"
        >
          <div className="flex flex-col justify-around bg-gray-900 flex-wrap pb-8">
            <div className="flex flex-col max-w-full">
              <h3 className="dark:text-white">
                Selecione um arquivo PDF para ser analisado e utilizado pela IA.
              </h3>
              <input
                type="file"
                accept=".pdf"
                onChange={(event) => {
                  handleFileChange(event);
                  handleInputChange(event);
                }}
                placeholder="Selecione um arquivo PDF para ser analisado e utilizado pela IA."
                className="rounded-md bg-green-400 w-full"
              />
              <textarea
                cols="80"
                rows="10"
                value={pdfContent}
                readOnly
                className="rounded-md text-black"
              ></textarea>
            </div>
            <div>
              <h3 className="dark:text-white">
                Selecione um dos prompts de IA abaixo.
              </h3>
              <div className="flex flex-col justify-between items-left">
                <input
                  type="text"
                  className=" dark:bg-gray-400 dark:placeholder-white"
                  placeholder="Busque por palavras chave."
                  onChange={buscar}
                />
              </div>
              <div className=" bg-blue-400 text-center lg:w-[90vh] border-2 overflow-auto">
                {estabuscando
                  ? busca?.map((pro) => {
                    return (
                      <div
                        key={pro.id}
                        className="flex justify-start text-base pl-1 pt-1 items-center"
                      >
                        <a
                          className="cursor-pointer mr-1 text-green-800"
                          onClick={() => editar(pro.prompt, pro.id)}
                        >
                          <TbSelect />
                        </a>
                        <p className='cursor-pointer select-none' onClick={() => editar(pro.prompt, pro.id)} >{pro.id}</p>
                      </div>
                    );
                  })
                  : prompta?.map((pro) => {
                    return (
                      <div
                        key={pro.id}
                        className="flex justify-start text-base pl-1 pt-1 items-center"
                      >
                        <a
                          className="cursor-pointer mr-1 text-green-800"
                          onClick={() => editar(pro.prompt, pro.id)}
                        >
                          <TbSelect />
                        </a>
                        <p className='cursor-pointer select-none' onClick={() => editar(pro.prompt, pro.id)} >{pro.id}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-48 mt-8 sm:mt-4 mb-4 h-12 rounded-md bg-green-400 self-center
      hover:bg-green-500"
          >
            Gerar {descricao}
          </button>
          <textarea

            value={completion}
            readOnly
            className="rounded-md w-full h-[400px] self-center text-black"
          ></textarea>
        </div>
      </form>
    </Layout>
  );
  /*
    <Layout
      titulo="Chat GPT 4.0"
      subtitulo="Aqui você irá utilizar a IA ChatGPT para auxiliá-lo no seu dia a dia!"
      tipoHeight="h-screen"
    >
      <form onSubmit={handleSubmit}>
        <h3>Selecione um arquivo PDF para ser analisado e utilizado pela IA.</h3>
        <div className="flex flex-col dark:text-black text-white dark:bg-gray-400 dark:placeholder-white">
          <input
            type="file"
            accept=".pdf"
            value={input}
            onChange={(event) => {
              handleFileChange(event)
              handleInputChange(event)
            }}
            placeholder="Selecione um arquivo PDF para ser analisado e utilizado pela IA."
          />
          <textarea cols="80" rows="10" value={pdfContent} readOnly></textarea>
          <h3>Selecione um dos prompts de IA abaixo clicando no ícone verde.</h3>
          <div className=" bg-blue-400 text-center border-2 h-24 overflow-auto">
            {prompta?.map((pro) => {
              return (
                <div
                  key={pro.id}
                  className="flex justify-start text-base pl-1 pt-1 items-center"
                >
                  <a
                    className="cursor-pointer mr-1 text-green-800"
                    onClick={() => editar(pro.prompt, pro.id)}
                  >
                    <TbSelect />
                  </a>
                  <p>{pro.id}</p>
                </div>
              );
            })}
          </div>
          <div>
            <div>
              <textarea
                cols="80"
                rows="5"
                value={completion}
                readOnly
              ></textarea>
            </div>
            <button disabled={isLoading} type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Layout>
          */
}
