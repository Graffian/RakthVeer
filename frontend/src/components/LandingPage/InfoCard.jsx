import React from "react";
import styles from "./RakthveerLandingPage.module.css";

function InfoCard({ title, listItems }) {
  return (
    <article className={styles.infoCard}>
      <h4 className={styles.infoCardTitle}>{title}</h4>
      <ul className={styles.infoCardList}>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default InfoCard;
