// src/DocViewerComponent.js
import React, { useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const DocViewerComponent = () => {
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setDocuments([{ uri: fileURL, fileName: file.name }]);
      console.log('File selected:', file.name);
      console.log('File URL:', fileURL);
    }
  };

  const handleError = (error) => {
    console.error('Error displaying document:', error);
  };

  return (
    <div>
      <h1>Document Viewer</h1>
      <input type="file" onChange={handleFileChange} />
      {documents.length > 0 && (
        <DocViewer
          documents={documents}
          pluginRenderers={DocViewerRenderers}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default DocViewerComponent;
