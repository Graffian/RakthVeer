"use client";
import React, { useRef } from "react";
import styles from "./InputDesign.module.css";

const FileUploadField = ({
  label,
  onChange,
  accept,
  required = false,
  helpText,
  selectedFile,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    onChange(e);
  };

  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return "📄";
    if (fileType.includes("pdf")) return "📄";
    if (fileType.includes("doc")) return "📝";
    return "📄";
  };

  return (
    <div className={styles.fileUploadGroup}>
      <label className={styles.fieldLabel}>
        {label} {required && "*"}
      </label>

      <div>
        <label
          className={styles.customFileUpload}
          onClick={handleCustomButtonClick}
        >
          Upload CDSCO certification
        </label>
        <span>{selectedFile ? selectedFile.name : ""}</span>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className={styles.fileInput}
          required={required}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {selectedFile && (
        <div className={styles.filePreviewContainer}>
          <div className={styles.filePreview}>
            <span className={styles.filePreviewIcon}>
              {getFileIcon(selectedFile.type)}
            </span>
          </div>
          <span className={styles.filePreviewName}>{selectedFile.name}</span>
        </div>
      )}

      {helpText && <p className={styles.fileHelpText}>{helpText}</p>}
    </div>
  );
};

export default FileUploadField;
