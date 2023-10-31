"use client"
import React, { useState } from 'react';
import pdfjs from 'pdfjs-dist/build/pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfTextExtractor = () => {
  const [pdfText, setPdfText] = useState('');
  
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      const reader = new FileReader();
      
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        const text = await extractPdfText(arrayBuffer);
        setPdfText(text);
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const extractPdfText = async (arrayBuffer) => {
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let text = '';
    
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      
      for (const item of content.items) {
        text += item.str + ' ';
      }
    }

    return text;
  };

  return (
    <div>
      <h2>Extrair Texto de PDF</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <textarea rows="10" value={pdfText} readOnly></textarea>
    </div>
  );
};

export default PdfTextExtractor;
