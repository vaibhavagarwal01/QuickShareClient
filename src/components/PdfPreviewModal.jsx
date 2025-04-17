// components/PdfPreviewModal.js
import { useState } from "react";
import { Document, Page } from "react-pdf";
import Modal from "react-modal";
import { Button } from "./Button";
import { pdfjs } from 'react-pdf';


export const PdfPreviewModal = ({ isOpen, onClose, base64Pdf }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setCurrentPage(1); // Reset to first page when new doc loads
    };

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, numPages));
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
            <div className="text-center">
                <Document
                    file={`data:application/pdf;base64,${base64Pdf}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={currentPage} />
                </Document>
                <div className="mt-4 flex justify-center space-x-4">
                    <Button onClick={handlePrev} label="Previous" />
                    <span>Page {currentPage} of {numPages}</span>
                    <Button onClick={handleNext} label="Next" />
                </div>
                <div className="mt-4">
                    <Button onClick={onClose} label="Close" />
                </div>
            </div>
        </Modal>
    );
};
