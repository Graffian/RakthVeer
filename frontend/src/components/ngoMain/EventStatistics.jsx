import React from "react";
import styles from "./InputDesign.module.css";
import EventList from "./EventList";

function EventStatistics({ stats, events, isLoading }) {
  return (
    <section className={styles.statsContainer}>
      <h2 className={styles.sectionTitle}>Event Statistics</h2>
      <div className={styles.statsSpacing} />

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Slots</h3>
          <p className={styles.statValue}>
            {isLoading ? "..." : stats.totalSlots}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Available Slots</h3>
          <p className={styles.statValue}>
            {isLoading ? "..." : stats.availableSlots}
          </p>
        </div>
      </div>

      <EventList events={events} isLoading={isLoading} />
    </section>
  );
}

export default EventStatistics;
