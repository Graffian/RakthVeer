"use client";
import React, { useState } from "react";
import styles from "./InputDesign.module.css";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationForm from "./RegistrationForm";
import OrganizationTypeSelector from "./OrganizationTypeSelector";
import ApiService from "./ApiService";

function InputDesign() {
  const [orgType, setOrgType] = useState("hospital");

  const [orgName, setOrgName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [bloodCapacity, setBloodCapacity] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate form fields
    if (!orgName || !address || !pincode || !bloodCapacity || !file) {
      setErrorMessage("Please fill in all required fields");
      return;
    }
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setErrorMessage("Please enter a valid 6-digit pincode");
      return;
    }
    if (isNaN(bloodCapacity) || parseInt(bloodCapacity) <= 0) {
      setErrorMessage("Please enter a valid blood storage capacity");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get file URI first
      const fileUri = await ApiService.getFileUri(file);

      // Prepare form data with file URI
      const formData = {
        orgType,
        orgName,
        address,
        pincode,
        bloodCapacity,
        fileUri,
        file, // Include the actual file for FormData
      };

      // Submit registration data
      const response = await ApiService.submitRegistration(formData);

      // Show success message
      setSuccessMessage("Registration submitted successfully!");

      // Optionally reset form fields after successful submission
      // setOrgName("");
      // setAddress("");
      // setPincode("");
      // setBloodCapacity("");
      // setFile(null);
    } catch (error) {
      // Handle submission error
      setErrorMessage(
        error.message || "Failed to submit registration. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={styles.pageContainer}>
      <div className={styles.contentLayout}>
        <aside className={styles.sidebarContainer}>
          <OrganizationTypeSelector
            selectedType={orgType}
            onTypeChange={setOrgType}
          />
        </aside>

        <main className={styles.mainContainer}>
          <div className={styles.formContainer}>
            <RegistrationHeader title="Organization Registration" />
            <RegistrationForm
              orgType={orgType}
              orgName={orgName}
              setOrgName={setOrgName}
              address={address}
              setAddress={setAddress}
              pincode={pincode}
              setPincode={setPincode}
              bloodCapacity={bloodCapacity}
              setBloodCapacity={setBloodCapacity}
              file={file}
              setFile={setFile}
              errorMessage={errorMessage}
              successMessage={successMessage}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </main>
      </div>
    </section>
  );
}

export default InputDesign;
