// pages/index.js

"use client"
import { useState } from 'react';


export default function Ai() {
  const [pdfContent, setPdfContent] = useState('');
  const [promptMessage, setPromptMessage] = useState('')
  const [aiText, setAiText] = useState('')
 
  let prompete = "Como advogado criminalista, seu papel é gerar uma defesa prévia para o acusado, com base na transcrição da denúncia '''{transcription}''', sendo o mais profissional possível e abordando todos as acusações utilizando-se para isso da jurisprudência mais atualizada e também da doutrina com a corrente mais aceita."

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPdfContent(data.text);
      }
    }
  };

  function mesclar(){
    setPromptMessage(prompete.replace("{transcription}", pdfContent));
  }


  const handleClickButton = async (event) => {

    const aiResponse = await fetch('/api/generate-ai-completion', {
      method: 'POST',
      body: JSON.stringify(promptMessage)
      });

    if(aiResponse.ok) {
      const dataText = await aiResponse.json();
      setAiText(dataText.text)
    }

  } 

  return (
    <div>
      <h1>PDF Text Extractor</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <textarea cols="30" rows="10" value={pdfContent} readOnly></textarea>
      <button onClick={mesclar}>Mesclar</button>
      <textarea cols="30" rows="10" value={promptMessage} readOnly></textarea>
      <button onClick={handleClickButton}>Gerar</button>
      <textarea cols="30" rows="10" value={aiText} readOnly></textarea>
    </div>
  );
}
