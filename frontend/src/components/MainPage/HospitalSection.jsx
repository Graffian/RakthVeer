"use client";
import React, { useState, useEffect } from "react";
import styles from "./BloodDonationPlatform.module.css";
import TopDonorsSection from "./TopDonorsSection";

function HospitalSection({ onHospitalSelect }) {
  // Hospital data with coordinates
  const [hospitals] = useState([
    // ... (keep your existing hospital data)
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    bloodGroup: "",
    unitsRequired: "",
    hospitalName: "",
    reason: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [errorMessage, setErrorMessage] = useState("");
  const [showSearchDonorButton, setShowSearchDonorButton] = useState(false);
  const [potentialDonors, setPotentialDonors] = useState([]);
  const [searchingDonors, setSearchingDonors] = useState(false);

  // Listen for clear hospital selection event
  useEffect(() => {
    const handleClearSelection = () => {
      if (onHospitalSelect) {
        onHospitalSelect(null);
      }
    };

    window.addEventListener("clearHospitalSelection", handleClearSelection);

    return () => {
      window.removeEventListener(
        "clearHospitalSelection",
        handleClearSelection,
      );
    };
  }, [onHospitalSelect]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    // ... (keep your existing validation logic)
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous submission status
    setSubmitStatus(null);
    setErrorMessage("");
    setShowSearchDonorButton(false);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus("error");
      setErrorMessage(validationError);
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://127.0.0.1:8000/api/donor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Handle successful submission
      setSubmitStatus("success");
      setShowSearchDonorButton(true);

      // Reset form after successful submission (except blood group and hospital)
      setFormData(prev => ({
        ...prev,
        name: "",
        contactNumber: "",
        unitsRequired: "",
        reason: ""
      }));

      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Failed to submit request. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle search for donors
  const handleSearchDonors = async () => {
    if (!formData.bloodGroup || !formData.hospitalName) {
      setSubmitStatus("error");
      setErrorMessage("Blood group and hospital are required to search donors");
      return;
    }

    setSearchingDonors(true);
    setSubmitStatus(null);

    try {
      // Replace with your actual API endpoint for searching donors
      const response = await fetch(`http://127.0.0.1:8000/api/donors/search?bloodGroup=${formData.bloodGroup}&hospital=${formData.hospitalName}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setPotentialDonors(data.donors || []);
      
      if (data.donors && data.donors.length > 0) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("info");
        setErrorMessage("No matching donors found. Our team will contact you soon.");
      }
    } catch (error) {
      console.error("Error searching donors:", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to search donors. Please try again later.");
    } finally {
      setSearchingDonors(false);
    }
  };

  // Handle hospital card click
  const handleHospitalClick = (hospital) => {
    if (onHospitalSelect) {
      onHospitalSelect(hospital);
      setFormData(prev => ({ ...prev, hospitalName: hospital.name }));

      // Scroll to map
      const mapElement = document.querySelector(`.${styles.mapContainer}`);
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className={styles.leftColumnContainer}>
      <TopDonorsSection />

      <h2 className={styles.sectionTitle}>Hospitals</h2>

      <section className={styles.requestFormContainer}>
        <h3 className={styles.formTitle}>Request Blood</h3>

        {submitStatus === "success" && !potentialDonors.length && (
          <div className={styles.successMessage}>
            <p>
              Your blood request has been submitted successfully! Our team will
              contact you shortly.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className={styles.errorMessage}>
            <p>{errorMessage || "An error occurred. Please try again."}</p>
          </div>
        )}

        {submitStatus === "info" && (
          <div className={styles.infoMessage}>
            <p>{errorMessage}</p>
          </div>
        )}

        {potentialDonors.length > 0 && (
          <div className={styles.donorsList}>
            <h4>Potential Donors:</h4>
            <ul>
              {potentialDonors.map((donor, index) => (
                <li key={index}>
                  <p>Name: {donor.name}</p>
                  <p>Contact: {donor.contactNumber}</p>
                  <p>Last Donation: {donor.lastDonationDate}</p>
                  <p>Distance: {donor.distance} km</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className={styles.requestForm} onSubmit={handleSubmit}>
          <input
            placeholder="Your Name"
            className={styles.formInput}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Contact Number"
            className={styles.formInput}
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />
          <select
            className={styles.formSelect}
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          <input
            placeholder="Units Required"
            type="number"
            className={styles.formInput}
            name="unitsRequired"
            value={formData.unitsRequired}
            onChange={handleInputChange}
            min="1"
            required
          />
          <input
            placeholder="Hospital Name"
            className={styles.fullWidthInput}
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleInputChange}
            required
          />
          <textarea
            placeholder="Reason for requirement"
            className={styles.formTextarea}
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
          />
          <button
            className={`${styles.submitButton} ${styles.builder8dd3a2832d5d43eb9529e7352f6b4d5d}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
          
          {showSearchDonorButton && (
            <button
              type="button"
              className={`${styles.submitButton} ${styles.searchDonorButton}`}
              onClick={handleSearchDonors}
              disabled={searchingDonors}
            >
              {searchingDonors ? "Searching..." : "Search Donors"}
            </button>
          )}
        </form>
      </section>

      <div className={styles.hospitalsListContainer}>
        {hospitals.map((hospital, index) => (
          <article
            className={`${styles.hospitalCard} ${styles.builder535ca9ad14374e178579f4f6bf309c97}`}
            key={index}
            onClick={() => handleHospitalClick(hospital)}
          >
            {/* ... (keep your existing hospital card JSX) */}
          </article>
        ))}
      </div>
    </section>
  );
}

export default HospitalSection;