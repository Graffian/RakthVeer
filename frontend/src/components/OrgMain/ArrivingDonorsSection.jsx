import React from "react";
import styles from "./ArrivingDonorsSection.module.css";

function ArrivingDonorsSection({
  arrivingDonors,
  processingDonors = [],
  onConfirmDonation,
  onRejectDonation,
}) {
  return (
    <section className={styles.arrivingDonorsCard}>
      <h3 className={styles.sectionTitle}>Arriving Donors</h3>

      {arrivingDonors.length === 0 ? (
        <p className={styles.emptyMessage}>No donors currently arriving</p>
      ) : (
        <ul className={styles.donorsList}>
          {arrivingDonors.map((donor) => (
            <li key={donor.id} className={styles.donorItem}>
              <div className={styles.donorInfo}>
                <h4 className={styles.donorName}>{donor.name}</h4>
                <p className={styles.donorLocation}>
                  <span className={styles.locationIcon}>📍</span>{" "}
                  {donor.location}
                  {donor.eta && (
                    <span className={styles.eta}> • ETA: {donor.eta}</span>
                  )}
                </p>
              </div>

              <div className={styles.donationStatus}>
                <p className={styles.statusLabel}>Has donated:</p>
                <div className={styles.actionButtons}>
                  {processingDonors.includes(donor.id) ? (
                    <div className={styles.loadingIndicator}>
                      <div className={styles.spinner}></div>
                    </div>
                  ) : (
                    <>
                      <button
                        className={styles.confirmButton}
                        onClick={() => onConfirmDonation(donor.id)}
                        aria-label={`Confirm ${donor.name} has donated`}
                        disabled={processingDonors.includes(donor.id)}
                      >
                        ✓
                      </button>
                      <button
                        className={styles.rejectButton}
                        onClick={() => onRejectDonation(donor.id)}
                        aria-label={`${donor.name} has not donated`}
                        disabled={processingDonors.includes(donor.id)}
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ArrivingDonorsSection;
