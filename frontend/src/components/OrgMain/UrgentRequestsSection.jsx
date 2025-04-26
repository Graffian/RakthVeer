import React from "react";
import styles from "./UrgentRequestsSection.module.css";

function UrgentRequestsSection() {
  const urgentRequests = [
    {
      userName: "John Doe",
      bloodGroup: "A",
      bloodType: "Positive",
      units: 3,
      timeLeft: "2hrs left",
    },
    {
      userName: "Jane Smith",
      bloodGroup: "O",
      bloodType: "Negative",
      units: 2,
      timeLeft: "4hrs left",
    },
  ];

  return (
    <section className={styles.urgentCard}>
      <h3 className={styles.sectionTitle}>Urgent Requests</h3>
      <div className={styles.requestsList}>
        {urgentRequests.map((request, index) => (
          <article className={styles.requestItem} key={index}>
            <div>
              <p className={styles.userName}>{request.userName}</p>
              <p className={styles.requestDetails}>
                {request.bloodGroup}
                {request.bloodType} needed ({request.units} units)
              </p>
            </div>
            <p className={styles.timeRemaining}>{request.timeLeft}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UrgentRequestsSection;
