"use client";
import React, { useState } from "react";
import styles from "./BloodDonationPlatform.module.css";
import dynamic from "next/dynamic";

// Dynamically import the LeafletMap component with no SSR
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className={styles.mapLoadingContainer}>
      <p>Loading map...</p>
    </div>
  ),
});

function DonatedUI({ hospitals }) {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [lastDonation, setLastDonation] = useState({
    date: "May 15, 2023",
    hospital: "CARE Hospitals",
    bloodType: "O+",
    units: 1,
  });
  const [nextEligibleDate, setNextEligibleDate] = useState("August 15, 2023");
  const [impactStats, setImpactStats] = useState({
    livesSaved: 3,
    totalDonations: 4,
    bloodTypeMatches: 12,
  });

  // Function to go back to regular UI
  const resetDonationStatus = () => {
    localStorage.setItem("donationStatus", "not-donated");
    window.location.reload();
  };

  return (
    <main className={`${styles.mainContainer} ${styles.donatedContainer}`}>
      <div className={styles.topBorder} />

      <div className={styles.donatedHeader}>
        <h1>Thank You for Your Donation!</h1>
        <p>
          Your contribution has helped save lives. Here's your donation impact.
        </p>
      </div>

      <section className={styles.donatedContentGrid}>
        <div className={styles.donationInfoCard}>
          <h2>Your Last Donation</h2>
          <div className={styles.donationDetails}>
            <div className={styles.donationDetail}>
              <span className={styles.detailLabel}>Date:</span>
              <span className={styles.detailValue}>{lastDonation.date}</span>
            </div>
            <div className={styles.donationDetail}>
              <span className={styles.detailLabel}>Hospital:</span>
              <span className={styles.detailValue}>
                {lastDonation.hospital}
              </span>
            </div>
            <div className={styles.donationDetail}>
              <span className={styles.detailLabel}>Blood Type:</span>
              <span className={styles.detailValue}>
                {lastDonation.bloodType}
              </span>
            </div>
            <div className={styles.donationDetail}>
              <span className={styles.detailLabel}>Units:</span>
              <span className={styles.detailValue}>{lastDonation.units}</span>
            </div>
          </div>

          <div className={styles.nextDonationInfo}>
            <h3>Next Eligible Donation Date</h3>
            <div className={styles.eligibleDate}>{nextEligibleDate}</div>
            <p>
              You need to wait at least 56 days between whole blood donations.
            </p>
          </div>
        </div>

        <div className={styles.impactCard}>
          <h2>Your Donation Impact</h2>
          <div className={styles.impactStats}>
            <div className={styles.impactStat}>
              <div className={styles.statValue}>{impactStats.livesSaved}</div>
              <div className={styles.statLabel}>Lives Saved</div>
            </div>
            <div className={styles.impactStat}>
              <div className={styles.statValue}>
                {impactStats.totalDonations}
              </div>
              <div className={styles.statLabel}>Total Donations</div>
            </div>
            <div className={styles.impactStat}>
              <div className={styles.statValue}>
                {impactStats.bloodTypeMatches}
              </div>
              <div className={styles.statLabel}>Blood Type Matches</div>
            </div>
          </div>

          <div className={styles.impactMessage}>
            <p>
              Your {lastDonation.bloodType} blood type is currently in high
              demand. Thank you for your contribution!
            </p>
          </div>
        </div>
      </section>

      <section className={styles.donatedMapSection}>
        <h2>Find Donation Centers for Your Next Donation</h2>
        <LeafletMap selectedHospital={selectedHospital} hospitals={hospitals} />
      </section>

      <section className={styles.donatedHospitalsSection}>
        <h2>Hospitals in Need</h2>
        <p>
          These hospitals are currently in need of your blood type. Mark your
          calendar for your next donation!
        </p>

        <div className={styles.donatedHospitalsList}>
          {hospitals.slice(0, 5).map((hospital, index) => (
            <div
              className={styles.donatedHospitalCard}
              key={index}
              onClick={() => setSelectedHospital(hospital)}
            >
              <h3>{hospital.name}</h3>
              <p>{hospital.location}</p>
              <div className={styles.hospitalNeedBadge}>
                Needs {lastDonation.bloodType}
              </div>
              <button className={styles.viewOnMapBtn}>View on Map</button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.shareSection}>
        <h2>Share Your Donation Journey</h2>
        <p>Inspire others to donate blood by sharing your experience.</p>
        <div className={styles.shareButtons}>
          <button className={`${styles.shareButton} ${styles.facebookShare}`}>
            Share on Facebook
          </button>
          <button className={`${styles.shareButton} ${styles.twitterShare}`}>
            Share on Twitter
          </button>
          <button className={`${styles.shareButton} ${styles.whatsappShare}`}>
            Share on WhatsApp
          </button>
        </div>
      </section>

      <button
        onClick={resetDonationStatus}
        className={styles.resetButton}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          background: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Reset Donation Status (Test)
      </button>
    </main>
  );
}

export default DonatedUI;
