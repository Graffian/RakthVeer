import React from "react";
import styles from "./BloodDonationDashboard.module.css";

function ContributionMessage() {
  return (
    <aside className={styles.contributionMessage}>
      <h3 className={styles.contributionHeading}>
        Don't worry! You can still contribute
      </h3>
      <p className={styles.contributionText}>
        Even if you can't donate blood right now, you can make a difference by
        volunteering at our camps!
      </p>
    </aside>
  );
}

export default ContributionMessage;
