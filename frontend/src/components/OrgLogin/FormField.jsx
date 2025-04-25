"use client";
import React from "react";
import styles from "./InputDesign.module.css";

const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  maxLength,
  pattern,
  className,
}) => {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>
        {label} {required && "*"}
      </label>
      <input
        className={className || styles.inputField}
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        pattern={pattern}
        onInput={onChange}
      />
    </div>
  );
};

export default FormField;
