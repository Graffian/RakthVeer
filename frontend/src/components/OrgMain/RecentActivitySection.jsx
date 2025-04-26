import React from "react";
import styles from "./RecentActivitySection.module.css";

function RecentActivitySection() {
  const activities = [
    "New donation request received",
    "Inventory updated",
    "Donation completed",
  ];

  return (
    <section className={styles.activityCard}>
      <h3 className={styles.sectionTitle}>Recent Activity</h3>
      <div className={styles.activityList}>
        {activities.map((activity, index) => (
          <p className={styles.activityItem} key={index}>
            {activity}
          </p>
        ))}
      </div>
    </section>
  );
}

export default RecentActivitySection;
