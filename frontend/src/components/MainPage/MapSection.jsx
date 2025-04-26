"use client";
import React, { useState, useEffect } from "react";
import styles from "./InputDesign.module.css";

function MapSection() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("loading");
  const [mapUrl, setMapUrl] = useState(
    "https://www.openstreetmap.org/export/embed.html?bbox=85.8019,20.2399,85.9019,20.3399&layer=mapnik"
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

        // Send location to your API
        fetch("http://127.0.0.1:8000/api/donor/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        }).then((res) => {
          if (!res.ok) {
            console.error("Failed to send location");
          }
        }).catch((err) => {
          console.error("Error sending location:", err);
        });

        // Create a bounding box around the user's location
        const delta = 0.05;
        const bbox = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`;

        setMapUrl(
          `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`
        );
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationStatus("error");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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
