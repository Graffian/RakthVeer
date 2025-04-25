"use client";
import React, { useState } from "react";
import styles from "./InputDesign.module.css";

function BloodRequestsSection() {
  const [requests] = useState([
    {
      name: "John Doe",
      bloodType: "A+",
      age: 45,
      urgent: true,
      distance: "2.5",
    },
    {
      name: "Jane Smith",
      bloodType: "O-",
      age: 32,
      urgent: false,
      distance: "4.8",
    },
    {
      name: "Mike Johnson",
      bloodType: "B+",
      age: 28,
      urgent: true,
      distance: "1.3",
    },
  ]);

  return (
    <section className={styles.requestsContainer}>
      <h2 className={styles.requestsTitle}>Blood Requests</h2>
      {requests.map((request, index) => (
        <article
          className={`${styles.requestCard} ${styles.builder7cc7c733e4b5488289b3d0f33675c1d2}`}
          key={index}
          style={{
            backgroundColor: request.urgent ? "#fff5f5" : "#f5fff5",
            borderLeft: `4px solid ${request.urgent ? "#dc3545" : "#28a745"}`,
          }}
        >
          <h3 className={styles.requestName}>{request.name}</h3>
          <div className={styles.requestInfoRow}>
            <p className={styles.requestBloodType}>
              <span>Blood Type: </span>
              <span>{request.bloodType}</span>
            </p>
            <span className={styles.distanceBadge}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8l0 8M8 12l8 0" />
              </svg>
              <span>{request.distance}</span>
              <span> km away</span>
            </span>
          </div>
          <p className={styles.requestAge}>
            <span>Age: </span>
            <span>{request.age}</span>
          </p>
          <div className={styles.requestActions}>
            <span
              className={styles.urgencyLabel}
              style={{
                backgroundColor: request.urgent ? "#dc3545" : "#28a745",
              }}
            >
              {request.urgent ? "Urgent" : "Not Urgent"}
            </span>
            <button
              className={`${styles.connectButton} ${styles.builder72850d50a17d4ea4984989eb002ca00a}`}
            >
              Connect
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default BloodRequestsSection;
