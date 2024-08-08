import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { convertToHtml } from 'docx-preview'; // You can also use mammoth.js if preferred

const FileViewerComponent = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (fileType === 'docx') {
      // Convert DOCX to HTML
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        convertToHtml(arrayBuffer, (html) => {
          setHtmlContent(html);
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file, fileType]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split('.').pop().toLowerCase();
      if (fileType === 'pdf' || fileType === 'docx') {
        setFile(selectedFile);
        setFileType(fileType);
      } else {
        alert('Please upload a PDF or DOCX file.');
        setFile(null);
        setFileType('');
      }
    }
  };

  return (
    <div>
      <h1>Document Viewer</h1>
      <input type="file" accept=".pdf, .docx" onChange={handleFileChange} />
      {file && fileType === 'pdf' && (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
          <div style={{ height: '750px' }}>
            <Viewer fileUrl={URL.createObjectURL(file)} plugins={[defaultLayoutPlugin()]} />
          </div>
        </Worker>
      )}
      {file && fileType === 'docx' && (
        <div style={{ padding: '20px' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}
    </div>
  );
};

export default FileViewerComponent;
