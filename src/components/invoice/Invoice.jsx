import { useState } from "react";
import DisplayData from "./DisplayData";
import DocumentUploader from "./DocumentUploader";
import { getApiUrl } from "../../apis/config";
import axios from "axios";

const Invoice = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const [status, setStatus] = useState("");
  const [documentId, setDocumentId] = useState();
  const [invoiceData, setInvoiceData] = useState(null);

  const handleUploadDocument = async () => {
    setLoading(true);
    setInvoiceData(null);
    try {
      await axios({
        method: "POST",
        url: `${getApiUrl}/api/upload-invoice`,
        data: { document: file },
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        setStatus(res.data.result.invoice.status);
        setDocumentId(res.data.result.invoice._id);
        setFile(null);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setProcess(true);
    try {
      await axios({
        method: "PATCH",
        url: `${getApiUrl}/api/invoice-status/${documentId}`,
      }).then(() => {
        handleGetInvoice(documentId);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetInvoice = async (documentId) => {
    try {
      await axios({
        method: "GET",
        url: `${getApiUrl}/api/invoice/${documentId}`,
      }).then((res) => {
        setProcess(false);
        setInvoiceData(res.data.result);
      });
    } catch (error) {
      console.log(error);
      setProcess(false);
    }
  };

  return (
    <div
      style={{
        width: "60%",
        margin: "auto",
        marginTop: "80px",
        textAlign: "center",
      }}
    >
      <DocumentUploader setFile={setFile} file={file} />
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <button
          disabled={!file}
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
          {loading ? `Uploading...` : `Upload`}
        </button>
        <button
          onClick={handleUpdate}
          style={{
            padding: "5px 20px",
            fontSize: "18px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            border: "1px solid #067ec4",
            cursor: "pointer",
          }}
        >
          {process ? `Loading...` : `Invoice Data`}
        </button>
      </div>

      <DisplayData status={status} invoiceData={invoiceData} />
    </div>
  );
};

export default Invoice;
