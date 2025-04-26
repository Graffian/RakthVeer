import React from "react";
import styles from "./InputDesign.module.css";

function EventCard({ event }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "upcoming":
        return {
          backgroundColor: "#e3f2fd",
          color: "#1976d2",
        };
      case "ongoing":
        return {
          backgroundColor: "#f0f4c3",
          color: "#827717",
        };
      case "completed":
        return {
          backgroundColor: "#ffccbc",
          color: "#d84315",
        };
      default:
        return {
          backgroundColor: "#e3f2fd",
          color: "#1976d2",
        };
    }
  };

  return (
    <article className={styles.eventItem}>
      <header className={styles.eventHeader}>
        <h4 className={styles.eventName}>{event.name}</h4>
        <span
          className={styles.statusBadge}
          style={getStatusStyle(event.status)}
        >
          {event.status}
        </span>
      </header>

      <p className={styles.eventMessage}>{event.message}</p>

      <div className={styles.eventDetails}>
        <div>
          <span>Location: </span>
          <span>{event.location}</span>
        </div>
        <div>
          <span>Date: </span>
          <span>{event.date}</span>
        </div>
        <div>
          <span>Time: </span>
          <span>{event.startTime}</span>
          <span> - </span>
          <span>{event.endTime}</span>
        </div>
      </div>

      <footer className={styles.eventStats}>
        <span>
          <span>Total Slots: </span>
          <span>{event.totalSlots}</span>
        </span>
        <span>
          <span>Booked: </span>
          <span>{event.bookedSlots}</span>
        </span>
        <span>
          <span>Available: </span>
          <span>{event.totalSlots - event.bookedSlots}</span>
        </span>
      </footer>
    </article>
  );
}

export default EventCard;
