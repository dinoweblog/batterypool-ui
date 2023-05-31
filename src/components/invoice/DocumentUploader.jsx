import React from "react";
import { useDropzone } from "react-dropzone";
import "./style.css";

const DocumentUploader = ({ setFile, file }) => {
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    console.log("Accepted Files:", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "pdf/*",
    multiple: false,
  });

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h2>Upload Invoice Document</h2>
      <div
        {...getRootProps()}
        className={`dropzone-container dropzone ${
          isDragActive ? "active" : ""
        }`}
      >
        <input className="dropzone-input" {...getInputProps()} />

        {isDragActive ? (
          <p className="dropzone-message">Drop the file here...</p>
        ) : (
          <p className="dropzone-message">
            Drag and drop file here, or click to select file
          </p>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, my: 5 }}>
        <p
          style={{
            width: "120px",
            overflow: "hidden",
          }}
        >
          {file?.name}
        </p>
      </div>
    </div>
  );
};

export default DocumentUploader;
