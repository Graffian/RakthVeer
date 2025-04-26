"use client";
import React, { useState, useEffect } from "react";
import styles from "./InputDesign.module.css";

function MapSection() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("loading");
  const [mapUrl, setMapUrl] = useState(
    "https://www.openstreetmap.org/export/embed.html?bbox=85.8019,20.2399,85.9019,20.3399&layer=mapnik",
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setLocationStatus("success");

        // Create a bounding box around the user's location
        const delta = 0.05; // Approximately 5km depending on latitude
        const bbox = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`;

        // Update map URL with user's location and marker
        setMapUrl(
          `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`,
        );
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationStatus("error");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  return (
    <section className={styles.mapContainer}>
      {locationStatus === "loading" && (
        <div className={styles.mapOverlay}>
          <p>Requesting your location...</p>
        </div>
      )}

      {locationStatus === "error" && (
        <div className={styles.mapOverlay}>
          <p>
            Location access denied. Please enable location services to see your
            position on the map.
          </p>
        </div>
      )}

      {locationStatus === "unsupported" && (
        <div className={styles.mapOverlay}>
          <p>
            Geolocation is not supported by your browser. Using default map
            view.
          </p>
        </div>
      )}

      <iframe
        src={mapUrl}
        className={styles.mapFrame}
        title="Blood donation centers map"
        allowFullScreen
      />

      {userLocation && (
        <div className={styles.locationInfo}>
          <p>
            Your current location: {userLocation.latitude.toFixed(4)},{" "}
            {userLocation.longitude.toFixed(4)}
          </p>
        </div>
      )}
    </section>
  );
}

export default MapSection;
