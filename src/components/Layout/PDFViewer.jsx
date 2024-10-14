import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';

const PDFViewer = () => {
  const { id } = useParams();
  const pdfUrl = ticketData ? `http://localhost:5000/api/transaccion/${ticketData.transactionalID}/ticket` : '';


  return (
    <div>
      <h1>Visor de PDF</h1>
      <Document file={pdfUrl} onLoadError={console.error}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
