import React from "react";
import styles from "./BloodDonationDashboard.module.css";
import CampCard from "./CampCard";

function CampsList({ camps }) {
  return (
    <section className={styles.campsSection}>
      <h2 className={styles.campsHeading}>Ongoing Blood Donation Camps</h2>
      <div className={styles.campsList}>
        {camps.map((camp) => (
          <CampCard key={camp.id} camp={camp} />
        ))}
      </div>
    </section>
  );
}

export default CampsList;
