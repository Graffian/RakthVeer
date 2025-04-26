import React from "react";
import styles from "./InputDesign.module.css";
import EventCard from "./EventCard";

function EventList({ events, isLoading }) {
  return (
    <section>
      <h3 className={styles.eventsTitle}>Recent Events</h3>
      <div className={styles.eventsList}>
        {isLoading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id || event._id} event={event} />
          ))
        ) : (
          <p>No events have been created yet.</p>
        )}
      </div>
    </section>
  );
}

export default EventList;
