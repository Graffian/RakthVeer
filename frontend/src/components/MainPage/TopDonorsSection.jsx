import React from "react";
import styles from "./BloodDonationPlatform.module.css";

function TopDonorsSection() {
  // Mock data
  const donors = [
    {
      id: 1,
      name: "Rahul Kumar",
      bloodType: "O+",
      location: "Mumbai",
      donations: 3,
      reliability: 98
    },
    {
      id: 2,
      name: "Priya Singh",
      bloodType: "A+",
      location: "Delhi",
      donations: 2,
      reliability: 95
    },
    {
      id: 3,
      name: "Amit Patel",
      bloodType: "B+",
      location: "Bangalore",
      donations: 2,
      reliability: 92
    }
  ];

  return (
    <div className={styles.topDonorsContainer}>
      <h2 className={styles.sectionTitle}>This Week's Top Donors</h2>
      
      <div className={styles.donorsScrollContainer}>
        {donors.map((donor, index) => (
          <div 
            key={donor.id} 
            className={`${styles.donorCard} ${
              index === 0 ? styles.goldDonor : 
              index === 1 ? styles.silverDonor : 
              styles.bronzeDonor
            }`}
          >
            <h3 className={styles.donorName}>{donor.name}</h3>
            <p className={styles.donorInfo}>
              <span className={styles.bloodType}>{donor.bloodType}</span> 
              <span className={styles.location}>{donor.location}</span>
            </p>
            <div className={styles.donorStats}>
              <span>{donor.donations} donations</span>
              <span className={styles.reliabilityBadge}>
                {donor.reliability}% reliability
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopDonorsSection;