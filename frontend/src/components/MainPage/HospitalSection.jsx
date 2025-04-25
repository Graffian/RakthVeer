"use client";
import React, { useState, useEffect } from "react";
import styles from "./BloodDonationPlatform.module.css";
import TopDonorsSection from "./TopDonorsSection";

function HospitalSection({ onHospitalSelect }) {
  // Hospital data with coordinates
  const [hospitals] = useState([
    {
      name: "CARE Hospitals",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3625441,
      longitude: 85.7569507,
    },
    {
      name: "Apollo Hospitals",
      location: "Sainik school Rd Bhubaneswar",
      latitude: 20.305959,
      longitude: 85.831954,
    },
    {
      name: "Manipal Hospitals",
      location: "Khandagiri Bhubaneswar",
      latitude: 20.260342,
      longitude: 85.777573,
    },
    {
      name: "Utkal Hospitals",
      location: "Neeladri vihar Bhubanesawr",
      latitude: 20.322777,
      longitude: 85.800459,
    },
    {
      name: "Vivekananda Hospital",
      location: "Baramunda Bhubaneswar",
      latitude: 20.279354,
      longitude: 85.800294,
    },
    {
      name: "SUM Ultimate Medicare",
      location: "Bhubaneswar",
      latitude: 20.283212,
      longitude: 85.772535,
    },
    {
      name: "Health Village Hospital",
      location: "Nayapalli Bhubaneswar",
      latitude: 20.29499,
      longitude: 85.816654,
    },
    {
      name: "Aditya Ashwini Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.330178,
      longitude: 85.82242,
    },
    {
      name: "All India Institute of Medical Sciences",
      location: "Patrapada Bhubaneswar",
      latitude: 20.231963,
      longitude: 85.774979,
    },
    {
      name: "Kalinga Institute Of Medical Sciences(KIMS)",
      location: "KIIT Rd Bhubaneswar",
      latitude: 20.352081,
      longitude: 85.813404,
    },
    {
      name: "Sunshine Hospital",
      location: "Laxmisagar Bhubaneswar",
      latitude: 20.269336,
      longitude: 85.848621,
    },
    {
      name: "Neelachal Hospital Pvt Ltd",
      location: "Unit 3 Bhubaneswar",
      latitude: 20.27085,
      longitude: 85.845395,
    },
    {
      name: "Blue Wheel Hospital",
      location: "Mancheswar Industrial Estate Bhubaneswar",
      latitude: 20.3095962,
      longitude: 85.8518169,
    },
    {
      name: "Sparsh Hospitals & Critical Care Pvt. Ltd.",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2953949,
      longitude: 85.8407094,
    },
    {
      name: "Kar Clinic & Hospital",
      location: "Unit 4 Bhubaneswar",
      latitude: 20.2772142,
      longitude: 85.8308099,
    },
    {
      name: "Hi-Tech Hospital & Medical College",
      location: "Rasulgarh Bhubaneswar",
      latitude: 20.3006702,
      longitude: 85.8745984,
    },
    {
      name: "Trinity Neuro Hospital & Trauma Centre",
      location: "Vani Vihar Bhubaneswar",
      latitude: 20.2949488,
      longitude: 85.8371871,
    },
    {
      name: "Shree Hospitals",
      location: "Lewis Rd BJB Nagar Bhubaneswar",
      latitude: 20.2483142,
      longitude: 85.8388699,
    },
    {
      name: "ESI Hospital",
      location: "IRC Village Bhubaneswar",
      latitude: 20.3003585,
      longitude: 85.818699,
    },
    {
      name: "PGIMER & Capital Hospital",
      location: "Unit 6 Bhubaneswar",
      latitude: 20.2600304,
      longitude: 85.8206853,
    },
    {
      name: "SimpleeKare Health",
      location: "IRC Village Bhubaneswar",
      latitude: 20.2917913,
      longitude: 85.8060073,
    },
    {
      name: "Maxfort Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3397454,
      longitude: 85.8184969,
    },
    {
      name: "Maternity Care Hospital",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2942902,
      longitude: 85.8414937,
    },
    {
      name: "Central Hospital East Coast Railway",
      location: "Mancheswar Bhubaneswar",
      latitude: 20.3211436,
      longitude: 85.8330069,
    },
    {
      name: "Baidyanath Memorial Hospital",
      location: "Kanan Vihar Bhubaneswar",
      latitude: 20.3422987,
      longitude: 85.8204354,
    },
    {
      name: "Narayani Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3216427,
      longitude: 85.8150689,
    },
    {
      name: "Capital Cure Healthcare",
      location: "Kanan Vihar Bhubaneswar",
      latitude: 20.3387581,
      longitude: 85.8204056,
    },
    {
      name: "Ananya Hospital",
      location: "BJB Nagar Bhubaneswar",
      latitude: 20.2590679,
      longitude: 85.8403809,
    },
    {
      name: "Jagannath Hospital",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2899794,
      longitude: 85.8345686,
    },
    {
      name: "Ahalya Hospital",
      location: "Patharagadia Bhubaneswar",
      latitude: 20.3624486,
      longitude: 85.7878508,
    },
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
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

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
    // Check if required fields are filled
    if (!formData.name.trim()) return "Name is required";
    if (!formData.contactNumber.trim()) return "Contact number is required";
    if (!formData.bloodGroup || formData.bloodGroup === "Select Blood Group")
      return "Blood group is required";
    if (!formData.unitsRequired) return "Units required is required";
    if (!formData.hospitalName.trim()) return "Hospital name is required";

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contactNumber.trim())) {
      return "Please enter a valid 10-digit contact number";
    }

    // Validate units required is a positive number
    if (
      isNaN(formData.unitsRequired) ||
      parseInt(formData.unitsRequired) <= 0
    ) {
      return "Units required must be a positive number";
    }

    return null; // No errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous submission status
    setSubmitStatus(null);
    setErrorMessage("");

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
      const response = await fetch("https://api.example.com/blood-requests", {
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

      // Reset form after successful submission
      setFormData({
        name: "",
        contactNumber: "",
        bloodGroup: "",
        unitsRequired: "",
        hospitalName: "",
        reason: "",
      });

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

  // Handle hospital card click
  const handleHospitalClick = (hospital) => {
    if (onHospitalSelect) {
      onHospitalSelect(hospital);

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

        {submitStatus === "success" && (
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

        <form className={styles.requestForm} onSubmit={handleSubmit}>
          <input
            placeholder="Your Name"
            className={styles.formInput}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            placeholder="Contact Number"
            className={styles.formInput}
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
          <select
            className={styles.formSelect}
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
          >
            <option>Select Blood Group</option>
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
          />
          <input
            placeholder="Hospital Name"
            className={styles.fullWidthInput}
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleInputChange}
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
        </form>
      </section>

      <div className={styles.hospitalsListContainer}>
        {hospitals.map((hospital, index) => (
          <article
            className={`${styles.hospitalCard} ${styles.builder535ca9ad14374e178579f4f6bf309c97}`}
            key={index}
            onClick={() => handleHospitalClick(hospital)}
          >
            <div>
              <h3 className={styles.hospitalName}>{hospital.name}</h3>
              <p className={styles.hospitalLocation}>{hospital.location}</p>
            </div>
            <div className={styles.hospitalStatusContainer}>
              <div className={styles.statusWrapper}>
                <div className={styles.bloodNeedBadge}>Needed: A+, O-</div>
                <div
                  className={styles.urgencyBadge}
                  style={{
                    backgroundColor:
                      index % 3 === 0 ? "rgb(220, 53, 69)" : "rgb(40, 167, 69)",
                  }}
                >
                  {index % 3 === 0 ? "⚡ URGENT" : "Regular Need"}
                </div>
              </div>
              <div className={styles.unitsInfo}>
                <span>Units needed: </span>
                <span>{index % 3 === 0 ? "5 units" : "2 units"}</span>
              </div>
            </div>
            <button
              className={styles.getDirectionsBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleHospitalClick(hospital);
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: "5px" }}
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HospitalSection;
