"use client";
import React from "react";
import styles from "./InputDesign.module.css";

const SubmitButton = ({ isSubmitting, text, loadingText }) => {
  return (
    <button
      className={styles.submitButton}
      type="submit"
      disabled={isSubmitting}
      style={{
        backgroundColor: isSubmitting
          ? "rgb(180, 180, 180)"
          : "rgb(190, 35, 43)",
        cursor: isSubmitting ? "not-allowed" : "pointer",
      }}
    >
      {isSubmitting ? loadingText : text}
    </button>
  );
};

export default SubmitButton;
