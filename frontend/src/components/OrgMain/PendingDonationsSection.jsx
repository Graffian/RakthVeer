import React from "react";
import styles from "./PendingDonationsSection.module.css";

function PendingDonationsSection() {
  return (
    <section className={styles.pendingCard}>
      <h3 className={styles.sectionTitle}>Pending Donations</h3>
      <div className={styles.contentRow}>
        <span className={styles.countValue}>12</span>
        <button className={styles.viewButton}>View All</button>
      </div>
    </section>
  );
}

export default PendingDonationsSection;
