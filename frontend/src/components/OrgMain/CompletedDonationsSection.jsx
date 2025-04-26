import React from "react";
import styles from "./CompletedDonationsSection.module.css";

function CompletedDonationsSection({ completedDonations }) {
  return (
    <section className={styles.completedCard}>
      <h3 className={styles.sectionTitle}>Completed Donations</h3>
      <div className={styles.donationsList}>
        {completedDonations.map((donation, index) => (
          <article className={styles.donationItem} key={index}>
            <div>
              <p className={styles.donorName}>{donation.donor}</p>
              <p className={styles.bloodType}>{donation.bloodType}</p>
            </div>
            <time className={styles.donationDate}>
              {new Date(donation.date).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CompletedDonationsSection;
