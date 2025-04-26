"use client";
import React from "react";
import styles from "./InputDesign.module.css";
import LocationAutocomplete from "./LocationAutocomplete";

function EventForm({ eventDetails, setEventDetails, addEvent, isLoading }) {
  const handleInputChange = (field, value) => {
    setEventDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className={styles.formContainer}>
      <h2 className={styles.sectionTitle}>Add New Blood Bank Event</h2>

      <div className={styles.formGroup}>
        <label htmlFor="eventMessage" className={styles.formLabel}>
          Event Message
        </label>
        <textarea
          id="eventMessage"
          placeholder="Add important information about the blood donation event..."
          className={styles.textareaField}
          value={eventDetails.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="eventName" className={styles.formLabel}>
          Event Name
        </label>
        <input
          id="eventName"
          type="text"
          className={styles.inputField}
          value={eventDetails.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      <div className={styles.locationGroup}>
        <label htmlFor="eventLocation" className={styles.formLabel}>
          Location
        </label>
        <LocationAutocomplete
          value={eventDetails.location}
          onChange={(value) => handleInputChange("location", value)}
        />
      </div>

      <div className={styles.twoColumnGrid}>
        <div>
          <label htmlFor="eventDate" className={styles.formLabel}>
            Date
          </label>
          <input
            id="eventDate"
            type="date"
            className={styles.inputField}
            value={eventDetails.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="totalSlots" className={styles.formLabel}>
            Total Slots
          </label>
          <input
            id="totalSlots"
            type="number"
            className={styles.inputField}
            value={eventDetails.totalSlots}
            onChange={(e) =>
              handleInputChange("totalSlots", parseInt(e.target.value))
            }
          />
        </div>
      </div>

      <div className={styles.timeGrid}>
        <div>
          <label htmlFor="startTime" className={styles.formLabel}>
            Start Time
          </label>
          <input
            id="startTime"
            type="time"
            className={styles.inputField}
            value={eventDetails.startTime}
            onChange={(e) => handleInputChange("startTime", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endTime" className={styles.formLabel}>
            End Time
          </label>
          <input
            id="endTime"
            type="time"
            className={styles.inputField}
            value={eventDetails.endTime}
            onChange={(e) => handleInputChange("endTime", e.target.value)}
          />
        </div>
      </div>

      <button
        className={`${styles.submitButton} ${styles.buttonCreateEvent}`}
        onClick={addEvent}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            Creating Event...
            <span className={styles.loadingSpinner}></span>
          </>
        ) : (
          "Create Blood Donation Event"
        )}
      </button>
    </section>
  );
}

export default EventForm;
