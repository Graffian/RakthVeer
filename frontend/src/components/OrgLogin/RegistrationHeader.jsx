import React from "react";
import styles from "./InputDesign.module.css";

const RegistrationHeader = ({ title }) => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>{title}</h1>
    </header>
  );
};

export default RegistrationHeader;
