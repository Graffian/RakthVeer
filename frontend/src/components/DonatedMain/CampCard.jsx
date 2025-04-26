"use client";
import React from "react";
import styles from "./BloodDonationDashboard.module.css";

function CampCard({ camp }) {
  const handleVolunteer = () => {
    // Handle volunteer action
    console.log(`Volunteered for ${camp.name}`);
  };

  return (
    <article className={styles.campCard}>
      <h3 className={styles.campName}>{camp.name}</h3>
      <div className={styles.campDetails}>
        <div>
          <div className={styles.campDate}>
            <span>📅 </span>
            <span>{camp.date}</span>
          </div>
          <div className={styles.campLocation}>
            <span>📍 </span>
            <span>{camp.location}</span>
          </div>
        </div>
        <div className={styles.volunteerSection}>
          <div className={styles.volunteerCount}>
            <div className={styles.volunteerLabel}>Volunteers</div>
            <div className={styles.volunteerNumbers}>
              <span>{camp.volunteers}</span>
              <span>/</span>
              <span>{camp.volunteersNeeded}</span>
            </div>
          </div>
          <button className={styles.volunteerButton} onClick={handleVolunteer}>
            Volunteer
          </button>
        </div>
      </div>
    </article>
  );
}

export default CampCard;
