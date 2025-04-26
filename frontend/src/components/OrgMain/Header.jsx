import React from "react";
import styles from "./Header.module.css";

function Header({ orgName, toggleMenu }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰
        </button>
        <h1 className={styles.title}>
          <span>Welcome, </span>
          <span>{orgName}</span>
        </h1>
      </div>
    </header>
  );
}

export default Header;
