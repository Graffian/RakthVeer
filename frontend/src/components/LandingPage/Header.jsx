"use client";
import React from "react";
import styles from "./RakthveerLandingPage.module.css";

function Header({ toggleLanguage }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <img
            alt="Raktveer Logo"
            src="https://images.pexels.com/photos/6941103/pexels-photo-6941103.jpeg"
            className={styles.logo}
          />
          <h1 className={styles.brandName}>Rakthveer</h1>
        </div>
        <button
          onClick={toggleLanguage}
          className={styles.languageToggle}
          aria-label="Toggle Language"
        >
          Translate
        </button>
      </div>
    </header>
  );
}

export default Header;
