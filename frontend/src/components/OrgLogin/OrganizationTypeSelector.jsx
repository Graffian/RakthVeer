"use client";
import React from "react";
import styles from "./InputDesign.module.css";

const OrganizationTypeSelector = ({ selectedType, onTypeChange }) => {
  return (
    <div className={styles.orgTypeContainer}>
      <h2 className={styles.orgTypeTitle}>Select Organization Type</h2>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="orgType"
            value="hospital"
            checked={selectedType === "hospital"}
            onChange={() => onTypeChange("hospital")}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>Login as Hospital</span>
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="orgType"
            value="ngo"
            checked={selectedType === "ngo"}
            onChange={() => onTypeChange("ngo")}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>Login as NGO</span>
        </label>
      </div>

      <div className={styles.orgTypeDescription} key={selectedType}>
        {selectedType === "hospital" ? (
          <p>
            Register your hospital to join our network of healthcare providers.
            Hospitals play a crucial role in providing essential medical
            services and emergency care.
          </p>
        ) : (
          <p>
            Register your NGO to collaborate with our network of healthcare
            organizations. NGOs are vital in extending healthcare services to
            underserved communities.
          </p>
        )}
      </div>

      <div className={styles.orgTypeInfo}>
        <h3 className={styles.orgTypeInfoTitle}>Registration Benefits</h3>
        <ul className={styles.orgTypeInfoList}>
          <li>Access to nationwide healthcare network</li>
          <li>Collaboration opportunities with other organizations</li>
          <li>Resource sharing and knowledge exchange</li>
          <li>Participation in healthcare initiatives</li>
        </ul>
      </div>
    </div>
  );
};

export default OrganizationTypeSelector;
