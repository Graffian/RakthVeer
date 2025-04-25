"use client";
import React from "react";
import styles from "./InputDesign.module.css";

const TextAreaField = ({ label, value, onChange, required = false }) => {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>
        {label} {required && "*"}
      </label>
      <textarea
        className={styles.textareaField}
        value={value}
        required={required}
        onInput={onChange}
      />
    </div>
  );
};

export default TextAreaField;
