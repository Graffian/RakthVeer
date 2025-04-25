"use client";
import React, { useState } from "react";
import styles from "./InputDesign.module.css";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationForm from "./RegistrationForm";
import OrganizationTypeSelector from "./OrganizationTypeSelector";

function InputDesign() {
  const [orgType, setOrgType] = useState("hospital");

  const [orgName, setOrgName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [bloodCapacity, setBloodCapacity] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
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
    setErrorMessage("");
    setIsSubmitting(true);
    // Handle form submission
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
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
