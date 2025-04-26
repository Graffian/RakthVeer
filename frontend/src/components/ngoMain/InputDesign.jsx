"use client";
import React, { useState, useEffect } from "react";
import styles from "./InputDesign.module.css";
import EventForm from "./EventForm";
import EventStatistics from "./EventStatistics";
import { createEvent, getEvents } from "./api";

// Mock data for development
const MOCK_EVENTS = [];

function InputDesign() {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    totalSlots: 50,
    message: "",
    status: "upcoming", // upcoming, ongoing, completed
  });

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const [stats, setStats] = useState({
    totalSlots: 0,
    bookedSlots: 0,
    availableSlots: 0,
  });

  // Fetch events from backend on component mount or use mock data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);

        // In a real app, we would check if we're in development mode
        // For now, we'll use a try-catch and fallback to mock data
        let fetchedEvents;
        try {
          fetchedEvents = await getEvents();
        } catch (apiError) {
          console.log("API not available, using mock data");
          fetchedEvents = MOCK_EVENTS;
        }

        setEvents(fetchedEvents);

        // Calculate stats based on fetched events
        const totalSlots = fetchedEvents.reduce(
          (acc, event) => acc + parseInt(event.totalSlots || 0),
          0,
        );
        const bookedSlots = fetchedEvents.reduce(
          (acc, event) => acc + parseInt(event.bookedSlots || 0),
          0,
        );

        setStats({
          totalSlots,
          bookedSlots,
          availableSlots: totalSlots - bookedSlots,
        });

        setIsLoading(false);
      } catch (err) {
        // Only show error if user has interacted with the app
        if (hasInteracted) {
          setError("Failed to load events. Please try again later.");
        }
        setIsLoading(false);
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [hasInteracted]);

  async function addEvent() {
    // Mark that user has interacted with the app
    setHasInteracted(true);

    // Clear any previous messages
    setError(null);
    setSuccessMessage("");

    // Validate form data
    if (!eventDetails.name || !eventDetails.location || !eventDetails.date) {
      setError("Please fill in all required fields (Name, Location, Date)");
      return;
    }

    try {
      setIsLoading(true);

      const eventToCreate = {
        ...eventDetails,
        createdAt: new Date().toISOString(),
        bookedSlots: 0,
      };

      // Send data to backend
      const createdEvent = await createEvent(eventToCreate);

      // Update local state with the response from the server
      setEvents((prevEvents) => [...prevEvents, createdEvent]);

      // Update stats
      setStats((prevStats) => ({
        totalSlots: prevStats.totalSlots + parseInt(eventDetails.totalSlots),
        bookedSlots: prevStats.bookedSlots,
        availableSlots:
          prevStats.availableSlots + parseInt(eventDetails.totalSlots),
      }));

      // Show success message
      setSuccessMessage("Event created successfully!");

      // Reset form
      setEventDetails({
        name: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        totalSlots: 50,
        message: "",
        status: "upcoming",
      });

      setIsLoading(false);
    } catch (err) {
      setError("Failed to create event. Please try again.");
      setIsLoading(false);
      console.error("Error creating event:", err);
    }
  }

  function updateEventStats(eventId, bookedCount) {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) => {
        if (event.id === eventId) {
          return { ...event, bookedSlots: bookedCount };
        }
        return event;
      });

      const totalBooked = updatedEvents.reduce(
        (acc, evt) => acc + evt.bookedSlots,
        0,
      );

      setStats((prevStats) => ({
        ...prevStats,
        bookedSlots: totalBooked,
        availableSlots: prevStats.totalSlots - totalBooked,
      }));

      return updatedEvents;
    });
  }

  return (
    <main className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.ngoTitle}>Life Savers Foundation</h1>
        <h2 className={styles.pageTitle}>Blood Bank Event Management</h2>

        {/* Display error message if there is one and user has interacted */}
        {error && hasInteracted && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}

        {/* Display success message if there is one */}
        {successMessage && (
          <div className={styles.successMessage}>
            <p>{successMessage}</p>
          </div>
        )}

        <div className={styles.twoColumnLayout}>
          <EventForm
            eventDetails={eventDetails}
            setEventDetails={(details) => {
              setHasInteracted(true);
              setEventDetails(details);
            }}
            addEvent={addEvent}
            isLoading={isLoading}
          />

          <EventStatistics
            stats={stats}
            events={events}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}

export default InputDesign;
