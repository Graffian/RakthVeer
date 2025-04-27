"use client";
import React, { useState } from "react";
import styles from "./BloodDonationPlatform.module.css";
import dynamic from "next/dynamic";
import TopDonorsSection from "./TopDonorsSection";
import HospitalSection from "./HospitalSection";
import BloodRequestsSection from "./BloodRequestsSection";
import ActivitySection from "./ActivitySection";

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
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Get all hospitals from HospitalSection for the map
  const hospitals = [
    {
      name: "CARE Hospitals",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3625441,
      longitude: 85.7569507,
      unitsNeeded: 5,
      bloodTypes: ["A+", "B+", "O+"],
      urgency: "High",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Apollo Hospitals",
      location: "Sainik school Rd Bhubaneswar",
      latitude: 20.305959,
      longitude: 85.831954,
      unitsNeeded: 3,
      bloodTypes: ["AB+", "O-"],
      urgency: "Medium",
      lastUpdated: "4 hours ago"
    },
    {
      name: "Manipal Hospitals",
      location: "Khandagiri Bhubaneswar",
      latitude: 20.260342,
      longitude: 85.777573,
      unitsNeeded: 8,
      bloodTypes: ["A-", "B-", "O+", "AB-"],
      urgency: "Critical",
      lastUpdated: "1 hour ago"
    },
    {
      name: "Utkal Hospitals",
      location: "Neeladri vihar Bhubanesawr",
      latitude: 20.322777,
      longitude: 85.800459,
      unitsNeeded: 2,
      bloodTypes: ["B+"],
      urgency: "Low",
      lastUpdated: "6 hours ago"
    },
    {
      name: "Vivekananda Hospital",
      location: "Baramunda Bhubaneswar",
      latitude: 20.279354,
      longitude: 85.800294,
      unitsNeeded: 4,
      bloodTypes: ["A+", "O+"],
      urgency: "Medium",
      lastUpdated: "3 hours ago"
    },
    {
      name: "SUM Ultimate Medicare",
      location: "Bhubaneswar",
      latitude: 20.283212,
      longitude: 85.772535,
      unitsNeeded: 6,
      bloodTypes: ["AB+", "B+", "O-"],
      urgency: "High",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Health Village Hospital",
      location: "Nayapalli Bhubaneswar",
      latitude: 20.29499,
      longitude: 85.816654,
      unitsNeeded: 1,
      bloodTypes: ["A+"],
      urgency: "Low",
      lastUpdated: "8 hours ago"
    },
    {
      name: "Aditya Ashwini Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.330178,
      longitude: 85.82242,
      unitsNeeded: 7,
      bloodTypes: ["O+", "B+", "AB+"],
      urgency: "Critical",
      lastUpdated: "30 minutes ago"
    },
    {
      name: "All India Institute of Medical Sciences",
      location: "Patrapada Bhubaneswar",
      latitude: 20.231963,
      longitude: 85.774979,
      unitsNeeded: 10,
      bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
      urgency: "Critical",
      lastUpdated: "15 minutes ago"
    },
    {
      name: "Kalinga Institute Of Medical Sciences(KIMS)",
      location: "KIIT Rd Bhubaneswar",
      latitude: 20.352081,
      longitude: 85.813404,
      unitsNeeded: 4,
      bloodTypes: ["B+", "O+"],
      urgency: "Medium",
      lastUpdated: "5 hours ago"
    },
    {
      name: "Sunshine Hospital",
      location: "Laxmisagar Bhubaneswar",
      latitude: 20.269336,
      longitude: 85.848621,
      unitsNeeded: 3,
      bloodTypes: ["A+", "B+"],
      urgency: "Medium",
      lastUpdated: "4 hours ago"
    },
    {
      name: "Neelachal Hospital Pvt Ltd",
      location: "Unit 3 Bhubaneswar",
      latitude: 20.27085,
      longitude: 85.845395,
      unitsNeeded: 2,
      bloodTypes: ["O+"],
      urgency: "Low",
      lastUpdated: "6 hours ago"
    },
    {
      name: "Blue Wheel Hospital",
      location: "Mancheswar Industrial Estate Bhubaneswar",
      latitude: 20.3095962,
      longitude: 85.8518169,
      unitsNeeded: 5,
      bloodTypes: ["A+", "AB+"],
      urgency: "High",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Sparsh Hospitals & Critical Care Pvt. Ltd.",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2953949,
      longitude: 85.8407094,
      unitsNeeded: 4,
      bloodTypes: ["B+", "O-"],
      urgency: "Medium",
      lastUpdated: "3 hours ago"
    },
    {
      name: "Kar Clinic & Hospital",
      location: "Unit 4 Bhubaneswar",
      latitude: 20.2772142,
      longitude: 85.8308099,
      unitsNeeded: 1,
      bloodTypes: ["A+"],
      urgency: "Low",
      lastUpdated: "7 hours ago"
    },
    {
      name: "Hi-Tech Hospital & Medical College",
      location: "Rasulgarh Bhubaneswar",
      latitude: 20.3006702,
      longitude: 85.8745984,
      unitsNeeded: 6,
      bloodTypes: ["AB+", "B+", "O+"],
      urgency: "High",
      lastUpdated: "1 hour ago"
    },
    {
      name: "Trinity Neuro Hospital & Trauma Centre",
      location: "Vani Vihar Bhubaneswar",
      latitude: 20.2949488,
      longitude: 85.8371871,
      unitsNeeded: 8,
      bloodTypes: ["A-", "B-", "O-", "AB-"],
      urgency: "Critical",
      lastUpdated: "45 minutes ago"
    },
    {
      name: "Shree Hospitals",
      location: "Lewis Rd BJB Nagar Bhubaneswar",
      latitude: 20.2483142,
      longitude: 85.8388699,
      unitsNeeded: 3,
      bloodTypes: ["A+", "O+"],
      urgency: "Medium",
      lastUpdated: "5 hours ago"
    },
    {
      name: "ESI Hospital",
      location: "IRC Village Bhubaneswar",
      latitude: 20.3003585,
      longitude: 85.818699,
      unitsNeeded: 7,
      bloodTypes: ["B+", "AB+", "O+"],
      urgency: "Critical",
      lastUpdated: "20 minutes ago"
    },
    {
      name: "PGIMER & Capital Hospital",
      location: "Unit 6 Bhubaneswar",
      latitude: 20.2600304,
      longitude: 85.8206853,
      unitsNeeded: 9,
      bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
      urgency: "Critical",
      lastUpdated: "10 minutes ago"
    },
    {
      name: "SimpleeKare Health",
      location: "IRC Village Bhubaneswar",
      latitude: 20.2917913,
      longitude: 85.8060073,
      unitsNeeded: 2,
      bloodTypes: ["B+"],
      urgency: "Low",
      lastUpdated: "8 hours ago"
    },
    {
      name: "Maxfort Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3397454,
      longitude: 85.8184969,
      unitsNeeded: 4,
      bloodTypes: ["A+", "O+"],
      urgency: "Medium",
      lastUpdated: "4 hours ago"
    },
    {
      name: "Maternity Care Hospital",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2942902,
      longitude: 85.8414937,
      unitsNeeded: 5,
      bloodTypes: ["A+", "B+", "AB+"],
      urgency: "High",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Central Hospital East Coast Railway",
      location: "Mancheswar Bhubaneswar",
      latitude: 20.3211436,
      longitude: 85.8330069,
      unitsNeeded: 3,
      bloodTypes: ["O+", "B+"],
      urgency: "Medium",
      lastUpdated: "5 hours ago"
    },
    {
      name: "Baidyanath Memorial Hospital",
      location: "Kanan Vihar Bhubaneswar",
      latitude: 20.3422987,
      longitude: 85.8204354,
      unitsNeeded: 2,
      bloodTypes: ["A+"],
      urgency: "Low",
      lastUpdated: "7 hours ago"
    },
    {
      name: "Narayani Hospital",
      location: "Chandrasekharpur Bhubaneswar",
      latitude: 20.3216427,
      longitude: 85.8150689,
      unitsNeeded: 6,
      bloodTypes: ["B+", "O+", "AB+"],
      urgency: "High",
      lastUpdated: "1 hour ago"
    },
    {
      name: "Capital Cure Healthcare",
      location: "Kanan Vihar Bhubaneswar",
      latitude: 20.3387581,
      longitude: 85.8204056,
      unitsNeeded: 4,
      bloodTypes: ["A+", "O+"],
      urgency: "Medium",
      lastUpdated: "3 hours ago"
    },
    {
      name: "Ananya Hospital",
      location: "BJB Nagar Bhubaneswar",
      latitude: 20.2590679,
      longitude: 85.8403809,
      unitsNeeded: 3,
      bloodTypes: ["B+", "O+"],
      urgency: "Medium",
      lastUpdated: "4 hours ago"
    },
    {
      name: "Jagannath Hospital",
      location: "Saheed Nagar Bhubaneswar",
      latitude: 20.2899794,
      longitude: 85.8345686,
      unitsNeeded: 5,
      bloodTypes: ["A+", "B+", "O+"],
      urgency: "High",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Ahalya Hospital",
      location: "Patharagadia Bhubaneswar",
      latitude: 20.3624486,
      longitude: 85.7878508,
      unitsNeeded: 2,
      bloodTypes: ["O+"],
      urgency: "Low",
      lastUpdated: "6 hours ago"
    }
  ];

  // Mock data for blood donation camps
  const bloodDonationCamps = [
    {
      id: 1,
      name: "Rotary Club Blood Donation Camp",
      location: "Jaydev Vihar Community Hall",
      date: "2024-03-15",
      slots: [
        { id: 1, time: "09:00 AM", available: true },
        { id: 2, time: "10:00 AM", available: true },
        { id: 3, time: "11:00 AM", available: false },
        { id: 4, time: "12:00 PM", available: true },
        { id: 5, time: "01:00 PM", available: true },
        { id: 6, time: "02:00 PM", available: false },
        { id: 7, time: "03:00 PM", available: true },
        { id: 8, time: "04:00 PM", available: true }
      ]
    },
    {
      id: 2,
      name: "Lions Club Blood Donation Drive",
      location: "Kalinga Stadium",
      date: "2024-03-16",
      slots: [
        { id: 1, time: "09:00 AM", available: true },
        { id: 2, time: "10:00 AM", available: true },
        { id: 3, time: "11:00 AM", available: true },
        { id: 4, time: "12:00 PM", available: false },
        { id: 5, time: "01:00 PM", available: true },
        { id: 6, time: "02:00 PM", available: true },
        { id: 7, time: "03:00 PM", available: false },
        { id: 8, time: "04:00 PM", available: true }
      ]
    },
    {
      id: 3,
      name: "Red Cross Society Blood Camp",
      location: "Biju Patnaik Park",
      date: "2024-03-17",
      slots: [
        { id: 1, time: "09:00 AM", available: true },
        { id: 2, time: "10:00 AM", available: false },
        { id: 3, time: "11:00 AM", available: true },
        { id: 4, time: "12:00 PM", available: true },
        { id: 5, time: "01:00 PM", available: false },
        { id: 6, time: "02:00 PM", available: true },
        { id: 7, time: "03:00 PM", available: true },
        { id: 8, time: "04:00 PM", available: true }
      ]
    },
    {
      id: 4,
      name: "Youth Blood Donation Initiative",
      location: "KIIT University Campus",
      date: "2024-03-18",
      slots: [
        { id: 1, time: "09:00 AM", available: true },
        { id: 2, time: "10:00 AM", available: true },
        { id: 3, time: "11:00 AM", available: true },
        { id: 4, time: "12:00 PM", available: true },
        { id: 5, time: "01:00 PM", available: false },
        { id: 6, time: "02:00 PM", available: true },
        { id: 7, time: "03:00 PM", available: true },
        { id: 8, time: "04:00 PM", available: false }
      ]
    }
  ];

  const handleCampSelect = (campId) => {
    const camp = bloodDonationCamps.find(c => c.id === parseInt(campId));
    setSelectedCamp(camp);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slotId) => {
    setSelectedSlot(slotId);
  };

  const handleBooking = () => {
    if (selectedCamp && selectedSlot) {
      // Here you would typically make an API call to book the slot
      alert(`Successfully booked slot ${selectedSlot} for ${selectedCamp.name}`);
      // Reset selections after booking
      setSelectedCamp(null);
      setSelectedSlot(null);
    }
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.topBorder} />

      {/* Map with directions */}
      <LeafletMap
        selectedHospital={selectedHospital}
        hospitals={hospitals}
        onHospitalSelect={setSelectedHospital}
      />

      <section className={styles.contentGrid}>
        <div className={styles.leftColumnContainer}>
          <HospitalSection onHospitalSelect={setSelectedHospital} />
          <BloodRequestsSection />
          
          {/* Camp Booking Section */}
          <div className={styles.campBookingContainer}>
            <h2 className={styles.campBookingTitle}>Book a Blood Donation Camp Slot</h2>
            
            <div className={styles.campSelector}>
              <label htmlFor="campSelect">Select a Camp:</label>
              <select 
                id="campSelect" 
                className={styles.campSelect}
                value={selectedCamp?.id || ''}
                onChange={(e) => handleCampSelect(e.target.value)}
              >
                <option value="">Choose a camp</option>
                {bloodDonationCamps.map(camp => (
                  <option key={camp.id} value={camp.id}>
                    {camp.name} - {camp.location} ({camp.date})
                  </option>
                ))}
              </select>
            </div>

            {selectedCamp && (
              <div className={styles.slotsContainer}>
                <h3>Available Time Slots</h3>
                <div className={styles.slotsGrid}>
                  {selectedCamp.slots.map(slot => (
                    <button
                      key={slot.id}
                      className={`${styles.slotButton} ${!slot.available ? styles.slotUnavailable : ''} ${selectedSlot === slot.id ? styles.slotSelected : ''}`}
                      onClick={() => slot.available && handleSlotSelect(slot.id)}
                      disabled={!slot.available}
                    >
                      {slot.time}
                      {!slot.available && <span className={styles.slotStatus}>Booked</span>}
                    </button>
                  ))}
                </div>
                
                {selectedSlot && (
                  <button 
                    className={styles.bookButton}
                    onClick={handleBooking}
                  >
                    Book Selected Slot
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Scrollable Hospitals List */}
          <div className={styles.hospitalsListContainer}>
            <h2 className={styles.hospitalsListTitle}>Hospitals in Bhubaneswar</h2>
            <div className={styles.hospitalsList}>
              {hospitals.map((hospital, index) => (
                <div 
                  key={index} 
                  className={`${styles.hospitalCard} ${selectedHospital?.name === hospital.name ? styles.selectedHospital : ''}`}
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <div className={styles.hospitalHeader}>
                    <h3>{hospital.name}</h3>
                    <span className={`${styles.urgencyBadge} ${styles[hospital.urgency.toLowerCase()]}`}>
                      {hospital.urgency}
                    </span>
                  </div>
                  <p className={styles.hospitalLocation}>{hospital.location}</p>
                  
                  <div className={styles.bloodInfo}>
                    <div className={styles.unitsNeeded}>
                      <span className={styles.label}>Units Needed:</span>
                      <span className={styles.value}>{hospital.unitsNeeded}</span>
                    </div>
                    <div className={styles.bloodTypes}>
                      <span className={styles.label}>Blood Types:</span>
                      <div className={styles.bloodTypeTags}>
                        {hospital.bloodTypes.map((type, idx) => (
                          <span key={idx} className={styles.bloodTypeTag}>{type}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.lastUpdated}>
                    Last updated: {hospital.lastUpdated}
                  </div>
                  
                  <button 
                    className={styles.getDirectionsBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHospital(hospital);
                    }}
                  >
                    Get Directions
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.rightColumnContainer}>
          <ActivitySection />
        </div>
      </section>
    </main>
  );
}

export default BloodDonationPlatform;
