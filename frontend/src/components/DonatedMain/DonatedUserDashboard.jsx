"use client";
import React, { useState } from "react";
import styles from "./BloodDonationDashboard.module.css";
import DonationTimer from "./DonationTimer";
import CampsList from "./CampsList";
import ContributionMessage from "./ContributionMessage";

function DonatedUserDashboard() {
  const [lastDonation, setLastDonation] = useState("12h 30m 15s");
  const [nextDonation, setNextDonation] = useState("77h 29m 45s");
  const [camps, setCamps] = useState([
    {
      id: 1,
      name: "City Hospital Blood Drive",
      date: "May 1, 2025",
      location: "123 Medical Center Ave",
      volunteers: 12,
      volunteersNeeded: 20,
    },
    {
      id: 2,
      name: "Community Health Camp",
      date: "May 5, 2025",
      location: "456 Wellness Road",
      volunteers: 8,
      volunteersNeeded: 15,
    },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.dashboardContent}>
        <DonationTimer
          lastDonation={lastDonation}
          nextDonation={nextDonation}
        />
        <CampsList camps={camps} />
        <ContributionMessage />
      </div>
    </div>
  );
}

export default DonatedUserDashboard;
