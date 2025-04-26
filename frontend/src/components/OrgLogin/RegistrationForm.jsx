"use client";
import React from "react";
import styles from "./InputDesign.module.css";
import FormField from "./FormField";
import TextAreaField from "./TextAreaField";
import FileUploadField from "./FileUploadField";
import SubmitButton from "./SubmitButton";

const RegistrationForm = ({
  orgType = "hospital",
  orgName,
  setOrgName,
  address,
  setAddress,
  pincode,
  setPincode,
  bloodCapacity,
  setBloodCapacity,
  file,
  setFile,
  errorMessage,
  successMessage,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <form className={styles.formContent} onSubmit={handleSubmit}>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      <FormField
        label="Organization Name"
        value={orgName || ""}
        onChange={(e) => setOrgName(e.target.value)}
        required
      />

      <TextAreaField
        label="Address"
        value={address || ""}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <FormField
        label="Pincode"
        value={pincode || ""}
        onChange={(e) => setPincode(e.target.value)}
        maxLength="6"
        pattern="[0-9]{6}"
        required
        className={styles.pincodeField}
      />

      <FormField
        label="Total Blood Storage Capacity (units)"
        value={bloodCapacity || ""}
        onChange={(e) => setBloodCapacity(e.target.value)}
        type="number"
        min="1"
        required
        className={styles.pincodeField}
      />

      <FileUploadField
        label="Upload Certifications"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        required
        helpText="Accepted formats: PDF, DOC, DOCX (Max size: 5MB)"
        selectedFile={file}
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        text={orgType === "hospital" ? "Register Hospital" : "Register NGO"}
        loadingText="Submitting..."
      />
    </form>
  );
};

export default RegistrationForm;
