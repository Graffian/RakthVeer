"use client";
import React, { useState, useEffect } from "react";
import styles from "./BloodDonationPlatform.module.css";
import dynamic from "next/dynamic";
import TopDonorsSection from "./TopDonorsSection";
import HospitalSection from "./HospitalSection";
import BloodRequestsSection from "./BloodRequestsSection";
import ActivitySection from "./ActivitySection";
import DonatedUI from "./DonatedUI";

// Dynamically import the LeafletMap component with no SSR
// This is necessary because Leaflet requires the window object
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className={styles.mapLoadingContainer}>
      <p>Loading map...</p>
    </div>
  ),
});

function BloodDonationPlatform() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hasDonated, setHasDonated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get all hospitals from HospitalSection for the map
  const hospitals = [
    {
      name: "CARE Hospitals",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3625441,
      longitude: 85.7569507,
    },
    {
      name: "Apollo Hospitals",
      location: "Sainik school Rd Bhubaneswar",
      latitude: 20.305959,
      longitude: 85.831954,
    },
    {
      name: "Manipal Hospitals",
      location: "Khandagiri Bhubaneswar",
      latitude: 20.260342,
      longitude: 85.777573,
    },
    {
      name: "Utkal Hospitals",
      location: "Neeladri vihar Bhubanesawr",
      latitude: 20.322777,
      longitude: 85.800459,
    },
    {
      name: "Vivekananda Hospital",
      location: "Baramunda Bhubaneswar",
      latitude: 20.279354,
      longitude: 85.800294,
    },
    {
      name: "SUM Ultimate Medicare",
      location: "Bhubaneswar",
      latitude: 20.283212,
      longitude: 85.772535,
    },
    {
      name: "Health Village Hospital",
      location: "Nayapalli Bhubaneswar",
      latitude: 20.29499,
      longitude: 85.816654,
    },
    {
      name: "Aditya Ashwini Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.330178,
      longitude: 85.82242,
    },
    {
      name: "All India Institute of Medical Sciences",
      location: "Patrapada Bhubaneswar",
      latitude: 20.231963,
      longitude: 85.774979,
    },
    {
      name: "Kalinga Institute Of Medical Sciences(KIMS)",
      location: "KIIT Rd Bhubaneswar",
      latitude: 20.352081,
      longitude: 85.813404,
    },
    {
      name: "Sunshine Hospital",
      location: "Laxmisagar Bhubaneswar",
      latitude: 20.269336,
      longitude: 85.848621,
    },
    {
      name: "Neelachal Hospital Pvt Ltd",
      location: "Unit 3 Bhubaneswar",
      latitude: 20.27085,
      longitude: 85.845395,
    },
    {
      name: "Blue Wheel Hospital",
      location: "Mancheswar Industrial Estate Bhubaneswar",
      latitude: 20.3095962,
      longitude: 85.8518169,
    },
    {
      name: "Sparsh Hospitals & Critical Care Pvt. Ltd.",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2953949,
      longitude: 85.8407094,
    },
    {
      name: "Kar Clinic & Hospital",
      location: "Unit 4 Bhubaneswar",
      latitude: 20.2772142,
      longitude: 85.8308099,
    },
    {
      name: "Hi-Tech Hospital & Medical College",
      location: "Rasulgarh Bhubaneswar",
      latitude: 20.3006702,
      longitude: 85.8745984,
    },
    {
      name: "Trinity Neuro Hospital & Trauma Centre",
      location: "Vani Vihar Bhubaneswar",
      latitude: 20.2949488,
      longitude: 85.8371871,
    },
    {
      name: "Shree Hospitals",
      location: "Lewis Rd BJB Nagar Bhubaneswar",
      latitude: 20.2483142,
      longitude: 85.8388699,
    },
    {
      name: "ESI Hospital",
      location: "IRC Village Bhubaneswar",
      latitude: 20.3003585,
      longitude: 85.818699,
    },
    {
      name: "PGIMER & Capital Hospital",
      location: "Unit 6 Bhubaneswar",
      latitude: 20.2600304,
      longitude: 85.8206853,
    },
    {
      name: "SimpleeKare Health",
      location: "IRC Village Bhubaneswar",
      latitude: 20.2917913,
      longitude: 85.8060073,
    },
    {
      name: "Maxfort Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3397454,
      longitude: 85.8184969,
    },
    {
      name: "Maternity Care Hospital",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2942902,
      longitude: 85.8414937,
    },
    {
      name: "Central Hospital East Coast Railway",
      location: "Mancheswar Bhubaneswar",
      latitude: 20.3211436,
      longitude: 85.8330069,
    },
    {
      name: "Baidyanath Memorial Hospital",
      location: "Kanan Vihar Bhubaneswar",
      latitude: 20.3422987,
      longitude: 85.8204354,
    },
    {
      name: "Narayani Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3216427,
      longitude: 85.8150689,
    },
    {
      name: "Capital Cure Healthcare",
      location: "Kanan Vihar Bhubaneswar",
      latitude: 20.3387581,
      longitude: 85.8204056,
    },
    {
      name: "Ananya Hospital",
      location: "BJB Nagar Bhubaneswar",
      latitude: 20.2590679,
      longitude: 85.8403809,
    },
    {
      name: "Jagannath Hospital",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2899794,
      longitude: 85.8345686,
    },
    {
      name: "Ahalya Hospital",
      location: "Patharagadia Bhubaneswar",
      latitude: 20.3624486,
      longitude: 85.7878508,
    },
  ];

  // Check donation status when the component mounts
  useEffect(() => {
    const checkDonationStatus = async () => {
      try {
        // In a real application, this would be an API call to check the user's donation status
        // For now, we'll simulate an API call with a timeout
        setTimeout(async () => {
          try {
            // This would be replaced with a real API call
            // const response = await fetch('https://api.example.com/user/donation-status');
            // const data = await response.json();

            // For demonstration, we'll use localStorage to simulate different states
            // In a real app, this would come from your backend
            const mockDonationStatus = localStorage.getItem("donationStatus");

            if (mockDonationStatus === "donated") {
              setHasDonated(true);
            } else {
              setHasDonated(false);
            }
          } catch (error) {
            console.error("Error checking donation status:", error);
            setHasDonated(false);
          } finally {
            setIsLoading(false);
          }
        }, 1000); // Simulate network delay
      } catch (error) {
        console.error("Error in donation status check:", error);
        setIsLoading(false);
        setHasDonated(false);
      }
    };

    checkDonationStatus();

    // For testing purposes - you can toggle this in the browser console
    // localStorage.setItem('donationStatus', 'donated'); // or 'not-donated'
  }, []);

  // For testing - function to toggle donation status
  const toggleDonationStatus = () => {
    const newStatus = !hasDonated;
    setHasDonated(newStatus);
    localStorage.setItem(
      "donationStatus",
      newStatus ? "donated" : "not-donated",
    );
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your blood donation information...</p>
      </div>
    );
  }

  // Render different UI based on donation status
  if (hasDonated) {
    return <DonatedUI hospitals={hospitals} />;
  }

  // Regular UI for non-donors
  return (
    <main className={styles.mainContainer}>
      <div className={styles.topBorder} />

      {/* For testing - button to toggle donation status */}
      <button
        onClick={toggleDonationStatus}
        className={styles.testButton}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          background: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Toggle Donation Status (Test)
      </button>

      {/* Map with directions */}
      <LeafletMap selectedHospital={selectedHospital} hospitals={hospitals} />

      <section className={styles.contentGrid}>
        <HospitalSection onHospitalSelect={setSelectedHospital} />
        <div className={styles.rightColumnContainer}>
          <BloodRequestsSection />
          <ActivitySection />
        </div>
      </section>
    </main>
  );
}

export default BloodDonationPlatform;
