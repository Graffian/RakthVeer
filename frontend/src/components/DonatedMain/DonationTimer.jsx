import React from "react";
import styles from "./BloodDonationDashboard.module.css";

function DonationTimer({ lastDonation, nextDonation }) {
  return (
    <div className={styles.timerContainer}>
      <div className={styles.lastDonationCard}>
        <div className={styles.timerLabel}>Last Donated</div>
        <div className={styles.timerValue}>
          <span>{lastDonation}</span>
          <span> ago</span>
        </div>
      </div>
      <div className={styles.nextDonationCard}>
        <div className={styles.timerLabel}>Next Donation In</div>
        <div className={styles.timerValue}>{nextDonation}</div>
      </div>
    </div>
  );
}

export default DonationTimer;
