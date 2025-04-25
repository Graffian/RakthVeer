"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./BloodDonationPlatform.module.css";

// This component will be loaded dynamically on the client side
function LeafletMap({ selectedHospital, hospitals, onHospitalSelect }) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routingControlRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationStatus, setLocationStatus] = useState("loading");
  const [directions, setDirections] = useState(null);

  // Initialize the map when the component mounts
  useEffect(() => {
    // Dynamic import of Leaflet to ensure it only runs on client
    const loadLeaflet = async () => {
      try {
        // Import Leaflet and related libraries
        const L = await import("leaflet");
        await import("leaflet/dist/leaflet.css");

        // Import Leaflet Routing Machine for directions
        const LRM = await import("leaflet-routing-machine");
        await import(
          "leaflet-routing-machine/dist/leaflet-routing-machine.css"
        );

        // Create map if it doesn't exist yet
        if (!leafletMapRef.current && mapRef.current) {
          // Initialize the map
          const map = L.map(mapRef.current).setView([20.296059, 85.82454], 12);

          // Add OpenStreetMap tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          // Create a layer group for hospital markers
          markersLayerRef.current = L.layerGroup().addTo(map);

          // Store the map reference
          leafletMapRef.current = map;
          setMapLoaded(true);
        }

        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
              setLocationStatus("success");

              // Center map on user location if no hospital is selected
              if (!selectedHospital && leafletMapRef.current) {
                leafletMapRef.current.setView([latitude, longitude], 13);

                // Add marker for user location
                const userIcon = L.divIcon({
                  html: `<div class="${styles.userLocationMarker}"></div>`,
                  className: "",
                  iconSize: [20, 20],
                });

                L.marker([latitude, longitude], { icon: userIcon })
                  .addTo(leafletMapRef.current)
                  .bindPopup("Your Location")
                  .openPopup();
              }
            },
            (error) => {
              console.error("Error getting location:", error);
              setLocationStatus("error");
            },
          );
        } else {
          setLocationStatus("unsupported");
        }
      } catch (error) {
        console.error("Error loading map libraries:", error);
      }
    };

    loadLeaflet();

    // Cleanup function
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Add hospital markers to the map
  useEffect(() => {
    const addHospitalMarkers = async () => {
      if (!mapLoaded || !leafletMapRef.current || !markersLayerRef.current)
        return;

      try {
        const L = await import("leaflet");

        // Clear existing markers
        markersLayerRef.current.clearLayers();

        // Add markers for all hospitals
        hospitals.forEach((hospital) => {
          const { latitude, longitude, name } = hospital;

          // Create hospital icon
          const hospitalIcon = L.divIcon({
            html: `<div class="${styles.hospitalMarker}"></div>`,
            className: "",
            iconSize: [24, 24],
          });

          // Add marker with custom popup
          const marker = L.marker([latitude, longitude], {
            icon: hospitalIcon,
          }).addTo(markersLayerRef.current);

          // Create custom popup content with Get Directions button
          const popupContent = document.createElement("div");
          popupContent.className = styles.markerPopup;

          const title = document.createElement("h4");
          title.textContent = name;
          popupContent.appendChild(title);

          const location = document.createElement("p");
          location.textContent = hospital.location;
          popupContent.appendChild(location);

          const directionsBtn = document.createElement("button");
          directionsBtn.className = styles.popupDirectionsBtn;
          directionsBtn.textContent = "Get Directions";
          directionsBtn.onclick = (e) => {
            e.preventDefault();
            if (onHospitalSelect) {
              onHospitalSelect(hospital);
            }
            marker.closePopup();
          };
          popupContent.appendChild(directionsBtn);

          marker.bindPopup(popupContent);

          // Add click handler to marker
          marker.on("click", () => {
            // Open popup first
            marker.openPopup();
          });
        });
      } catch (error) {
        console.error("Error adding hospital markers:", error);
      }
    };

    if (hospitals && hospitals.length > 0) {
      addHospitalMarkers();
    }
  }, [hospitals, mapLoaded, onHospitalSelect]);

  // Show directions when a hospital is selected
  useEffect(() => {
    const showDirections = async () => {
      if (
        !mapLoaded ||
        !leafletMapRef.current ||
        !userLocation ||
        !selectedHospital
      )
        return;

      try {
        const L = await import("leaflet");
        const LRM = await import("leaflet-routing-machine");

        // Remove existing routing control if it exists
        if (routingControlRef.current) {
          leafletMapRef.current.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }

        // Reset directions
        setDirections(null);

        // Create new routing control with visible itinerary
        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(userLocation.lat, userLocation.lng),
            L.latLng(selectedHospital.latitude, selectedHospital.longitude),
          ],
          routeWhileDragging: false,
          showAlternatives: true,
          fitSelectedRoutes: true,
          show: false, // Hide default instructions panel
          lineOptions: {
            styles: [{ color: "#dc3545", opacity: 0.7, weight: 6 }],
          },
          createMarker: function (i, waypoint, n) {
            const icons = [
              L.divIcon({
                html: `<div class="${styles.userLocationMarker}"></div>`,
                className: "",
                iconSize: [20, 20],
              }),
              L.divIcon({
                html: `<div class="${styles.hospitalMarker}"></div>`,
                className: "",
                iconSize: [24, 24],
              }),
            ];

            return L.marker(waypoint.latLng, { icon: icons[i] });
          },
        }).addTo(leafletMapRef.current);

        // Add popup to destination marker
        routingControlRef.current.on("routesfound", function (e) {
          const routes = e.routes;
          const summary = routes[0].summary;
          // Distance in meters, time in seconds
          const distance = (summary.totalDistance / 1000).toFixed(2);
          const time = Math.round(summary.totalTime / 60);

          // Create popup with route information
          const popup = L.popup()
            .setLatLng([selectedHospital.latitude, selectedHospital.longitude])
            .setContent(
              `
              <div class="${styles.routePopup}">
                <h4>${selectedHospital.name}</h4>
                <p>Distance: ${distance} km</p>
                <p>Estimated time: ${time} minutes</p>
              </div>
            `,
            )
            .openOn(leafletMapRef.current);

          // Extract turn-by-turn directions
          const instructions = routes[0].instructions.map((instruction) => ({
            text: instruction.text,
            distance: instruction.distance,
            time: instruction.time,
            direction: instruction.direction,
            road: instruction.road,
          }));

          setDirections({
            summary: {
              distance,
              time,
            },
            instructions,
          });
        });
      } catch (error) {
        console.error("Error showing directions:", error);
      }
    };

    if (selectedHospital) {
      showDirections();
    } else {
      setDirections(null);
    }
  }, [selectedHospital, userLocation, mapLoaded]);

  // Format time for directions
  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} sec`;
    }
    return `${Math.round(seconds / 60)} min`;
  };

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
            Location access denied. Please enable location services to see
            directions.
          </p>
        </div>
      )}

      {locationStatus === "unsupported" && (
        <div className={styles.mapOverlay}>
          <p>Geolocation is not supported by your browser.</p>
        </div>
      )}

      {selectedHospital && (
        <div className={styles.directionsInfo}>
          <h3>Directions to {selectedHospital.name}</h3>
          {directions && (
            <div className={styles.directionsSummary}>
              <p>Distance: {directions.summary.distance} km</p>
              <p>Estimated time: {directions.summary.time} minutes</p>
            </div>
          )}
          <button
            className={styles.clearDirectionsBtn}
            onClick={() => {
              if (onHospitalSelect) {
                onHospitalSelect(null);
              } else {
                window.dispatchEvent(new CustomEvent("clearHospitalSelection"));
              }
            }}
          >
            Clear Directions
          </button>
        </div>
      )}

      <div ref={mapRef} className={styles.leafletMap}></div>

      {directions && (
        <div className={styles.directionsPanel}>
          <h4>Turn-by-Turn Directions</h4>
          <ul className={styles.directionsList}>
            {directions.instructions.map((instruction, index) => (
              <li key={index} className={styles.directionStep}>
                <span className={styles.directionText}>{instruction.text}</span>
                {instruction.distance > 0 && (
                  <span className={styles.directionDistance}>
                    {(instruction.distance / 1000).toFixed(1)} km
                  </span>
                )}
                {instruction.time > 0 && (
                  <span className={styles.directionTime}>
                    {formatTime(instruction.time)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default LeafletMap;
