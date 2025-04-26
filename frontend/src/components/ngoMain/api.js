/**
 * API service for communicating with the backend
 */

// Base URL for API requests - replace with your actual backend URL
const API_BASE_URL = "/api";

// Check if we're in development mode
const isDevelopment = true; // In a real app, this would be process.env.NODE_ENV === 'development'

/**
 * Create a new blood donation event
 * @param {Object} eventData - The event data to be sent to the backend
 * @returns {Promise} - Promise that resolves with the created event data
 */
export const createEvent = async (eventData) => {
  try {
    // In development mode, simulate a successful API call
    if (isDevelopment) {
      console.log("Development mode: Simulating API call to create event");
      // Add an ID and return the event data
      return {
        ...eventData,
        id: Date.now(),
      };
    }

    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create event");
    }

    return await response.json();
  } catch (error) {
    if (isDevelopment) {
      console.warn("API error in development mode, returning mock data");
      return {
        ...eventData,
        id: Date.now(),
      };
    }
    console.error("Error creating event:", error);
    throw error;
  }
};

/**
 * Get all events
 * @returns {Promise} - Promise that resolves with an array of events
 */
export const getEvents = async () => {
  try {
    // In development mode, return an empty array
    if (isDevelopment) {
      console.log("Development mode: Returning empty events array");
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/events`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch events");
    }

    return await response.json();
  } catch (error) {
    if (isDevelopment) {
      console.warn("API error in development mode, returning empty array");
      return [];
    }
    console.error("Error fetching events:", error);
    throw error;
  }
};

/**
 * Update an existing event
 * @param {string|number} eventId - The ID of the event to update
 * @param {Object} eventData - The updated event data
 * @returns {Promise} - Promise that resolves with the updated event data
 */
export const updateEvent = async (eventId, eventData) => {
  try {
    // In development mode, simulate a successful API call
    if (isDevelopment) {
      console.log("Development mode: Simulating API call to update event");
      return {
        ...eventData,
        id: eventId,
        updatedAt: new Date().toISOString(),
      };
    }

    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update event");
    }

    return await response.json();
  } catch (error) {
    if (isDevelopment) {
      console.warn("API error in development mode, returning mock data");
      return {
        ...eventData,
        id: eventId,
        updatedAt: new Date().toISOString(),
      };
    }
    console.error("Error updating event:", error);
    throw error;
  }
};
