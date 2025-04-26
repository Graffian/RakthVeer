"use client";
import React from "react";
import styles from "./RakthveerLandingPage.module.css";

function LoginButton({ primary, mainText, onClick }) {
  const buttonClass = primary
    ? styles.builder04306da5f7b54d27a2d25cd373848428
    : styles.builderE1864755c48a45a2882958d48160f579;

  return (
    <button className={buttonClass} onClick={onClick}>
      {mainText}
    </button>
  );
}

export default LoginButton;
