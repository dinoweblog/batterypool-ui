import { useState } from "react";
import DisplayData from "./DisplayData";
import DocumentUploader from "./DocumentUploader";
import { getApiUrl } from "../../apis/config";
import axios from "axios";

const Invoice = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleUploadDocument = async () => {
    setLoading(true);
    try {
      await axios({
        method: "POST",
        url: `${getApiUrl}/api/upload-invoice`,
        data: { document: file },
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        setStatus(res.data.result.invoice.status);
        setFile(null);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleGetInvoice = async (documentId) => {
    try {
      await axios({
        method: "GET",
        url: `${getApiUrl}/api/invoice/${documentId}`,
        data: { document: file },
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        // handleImages(res.data.result.images, index);
        setFile(null);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "70%",
        margin: "auto",
        marginTop: "80px",
        textAlign: "center",
      }}
    >
      <DocumentUploader setFile={setFile} file={file} />
      <button
        onClick={handleUploadDocument}
        style={{
          padding: "5px 20px",
          fontSize: "18px",
          backgroundColor: "#067ec4",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? `Uploading` : `Upload`}
      </button>
      <DisplayData />
    </div>
  );
};

export default Invoice;
