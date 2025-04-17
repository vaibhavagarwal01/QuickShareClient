import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import api from '../services/api';
import { useNavigate } from "react-router-dom";
import { PdfPreviewModal } from "../components/PdfPreviewModal";

export const ListFiles = () => {
    const [listFiles, setListFiles] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await api.file.list();
                setListFiles(response.data.files);
            } catch (error) {
                console.error("Failed to fetch files:", error.response?.data || error.message);
                alert(error.response?.data?.message || "Error fetching files.");
            }
        };

        fetchFiles();
    }, []);
    
    const handleOnClickUploadFile = async() => {
        navigate('/fileUpload');
    }

    return <div>
        <div className="flex justify-center mt-6">
            <div className="font-semibold text-3xl mr-5"> 
                List of uploaded files
            </div>
            <div>
                <Button onClick={handleOnClickUploadFile} label={"Upload file"}></Button>
            </div>
        </div>
        <div className="mt-20">
            {listFiles.map(file => (
                <FileDetails key={file._id} file={file} />
            ))}
        </div>
    </div>
};

function FileDetails({ file }) {
    const [sharedLink, setSharedLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [previewPdfBase64, setPreviewPdfBase64] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const isPdf = file.name.toLowerCase().endsWith(".pdf");

    const handleOnClick = async () => {
        try {
            const response = await api.file.share(file._id);
            setSharedLink(response.data.url);
            setCopied(false);
            if (response.data.previewPdf) {
                setPreviewPdfBase64(response.data.previewPdf);
            }
        } catch (error) {
            console.error("Error sharing file:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Error generating share link.");
        }
    };

    const copyUrlToClipboard = () => {
        navigator.clipboard.writeText(sharedLink);
        setCopied(true);
    }

    // // Check if file is a PDF based on name or type
    // const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    
    // // Preview PDF function
    // const previewPdf = () => {
    //     window.open(sharedLink, '_blank', 'noopener,noreferrer');
    // }

    return (
        <div className="flex justify-center pl-20 pr-20 mt-5">
            <div className="mr-20 font-medium">
                {file.name}  
            </div>
            <div>
                <Button onClick={handleOnClick} label={"Share"}></Button>
            </div>
            {sharedLink && (
                    <>
                        <div className=" ml-5 w-25">
                            <Button onClick={copyUrlToClipboard} label={copied ? "Copied!" : "Copy link"} />
                        </div>
                        {isPdf && previewPdfBase64 && (
                            <div className="ml-5 w-25">
                                <Button onClick={() => setModalOpen(true)} label={"Preview PDF"} />
                            </div>
                        )}
                    </>
            )}
            <PdfPreviewModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                base64Pdf={previewPdfBase64}
            />
        </div>
    )
}

