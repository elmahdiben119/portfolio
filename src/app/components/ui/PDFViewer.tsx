// components/PDFViewer.tsx
import React, { useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
    fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    useEffect(() => {
        console.log('PDF Viewer mounted');

        return () => {
            console.log('PDF Viewer unmounted');
        };
    }, []);

    return (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <div style={{ height: '1000px', width: '80vw', marginTop: '30px' }}>
                <Viewer fileUrl={fileUrl} />
            </div>
        </Worker>
    );
};

export default PDFViewer;
