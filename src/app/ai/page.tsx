// pages/index.js

"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/template/Layout";
import firebase from "../../firebase/config";
import { TbSelect } from "react-icons/tb"

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
  const [prompete, setPrompete] = useState("")

  const [prompta, setPrompta] = useState<Prompt[]>();

  useEffect(() => {
    db.collection("/areas/penal/prompts").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var x = doc.data();
          prompts.push(x);
        });

        setPrompta(prompts);
        prompts = [];
      });
  }, []);

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

  function editar(ref: string) {
    setPrompete(ref)
  }

  function mesclar() {
    setPromptMessage(prompete.replace("{transcription}", pdfContent));
  }

  const handleClickButton = async (event) => {
    const aiResponse = await fetch("/api/generate-ai-completion", {
      method: "POST",
      body: JSON.stringify(promptMessage),
    });

    if (aiResponse.ok) {
      const dataText = await aiResponse.json();
      setAiText(dataText.text);
    }
  };

  return (
    <Layout
      titulo="Chat GPT 4.0"
      subtitulo="Aqui você irá utilizar a IA ChatGpt para auxiliá-lo no seu dia a dia!"
      tipoHeight="h-screen"
    >
      <h3>Selecione um arquivo PDF para ser analisado e utilizado pela IA.</h3>
      <div className="flex flex-col dark:text-black text-white dark:bg-gray-400 dark:placeholder-white">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          placeholder="Selecione um arquivo PDF para ser analisado e utilizado pela IA."
        />
        <textarea cols="80" rows="8" value={pdfContent} readOnly></textarea>
        <div className=" bg-blue-400 text-center border-2 h-20 overflow-auto">
          {prompta?.map((pro) => {
            return (
              <div
                key={pro.id}
                className="flex justify-start text-sm pl-1 pt-1 items-center"
              >
                <a
                  className="cursor-pointer mr-1 text-green-800" onClick={() => editar(pro.prompt)}
                >
                  <TbSelect />
                </a>
                <p>{pro.id}</p>
              </div>
            );
          })}
        </div>

        <button onClick={mesclar}>Mesclar</button>
        <textarea cols="80" rows="8" value={promptMessage} readOnly></textarea>
        <button onClick={handleClickButton}>Gerar</button>
        <textarea cols="80" rows="8" value={aiText} readOnly></textarea>
      </div>
    </Layout>
  );
}
