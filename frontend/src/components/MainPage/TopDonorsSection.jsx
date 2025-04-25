import React from "react";
import styles from "./InputDesign.module.css";

function TopDonorsSection() {
  return (
    <section className={styles.topDonorsContainer}>
      <h2 className={styles.sectionTitle}>This Week's Top Donors 🏆</h2>
      <div className={styles.donorsScrollContainer}>
        <article className={styles.donorCard}>
          <h3 className={styles.donorName}>🥇 Rahul Kumar</h3>
          <p className={styles.donorInfo}>Donated: O+ Blood</p>
          <div className={styles.donorStats}>
            <span>Donations: 3 times</span>
            <span className={styles.reliabilityBadge}>98% Reliability</span>
          </div>
        </article>

        <article className={styles.donorCard}>
          <h3 className={styles.donorName}>🥈 Priya Singh</h3>
          <p className={styles.donorInfo}>Donated: A+ Blood</p>
          <p className={styles.donorInfo}>Donations: 2 times</p>
        </article>

        <article className={styles.donorCard}>
          <h3 className={styles.donorName}>🥉 Amit Patel</h3>
          <p className={styles.donorInfo}>Donated: B+ Blood</p>
          <p className={styles.donorInfo}>Donations: 2 times</p>
        </article>
      </div>
    </section>
  );
}

export default TopDonorsSection;
