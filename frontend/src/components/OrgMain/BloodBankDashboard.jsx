"use client";
import React, { useState, useCallback } from "react";
import styles from "./BloodBankDashboard.module.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import InventorySection from "./InventorySection";
import PendingDonationsSection from "./PendingDonationsSection";
import CompletedDonationsSection from "./CompletedDonationsSection";
import UrgentRequestsSection from "./UrgentRequestsSection";
import InventoryUpdatesSection from "./InventoryUpdatesSection";
import RecentActivitySection from "./RecentActivitySection";

function BloodBankDashboard() {
  const [orgName, setOrgName] = useState("City Blood Bank");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [bloodInventory, setBloodInventory] = useState({
    "A+": 45,
    "A-": 12,
    "B+": 67,
    "B-": 23,
    "O+": 56,
    "O-": 18,
    "AB+": 15,
    "AB-": 9,
  });

  const [pendingInventoryChanges, setPendingInventoryChanges] = useState({});

  const [completedDonations, setCompletedDonations] = useState([
    {
      donor: "John Smith",
      bloodType: "A+",
      date: "2024-03-15",
    },
    {
      donor: "Sarah Wilson",
      bloodType: "O-",
      date: "2024-03-14",
    },
    {
      donor: "Mike Johnson",
      bloodType: "B+",
      date: "2024-03-14",
    },
  ]);

  const [inventoryUpdates, setInventoryUpdates] = useState([
    {
      type: "Received",
      units: 5,
      bloodType: "A+",
      timestamp: "2024-03-15 09:30",
    },
    {
      type: "Issued",
      units: 2,
      bloodType: "O+",
      timestamp: "2024-03-15 10:15",
    },
    {
      type: "Received",
      units: 3,
      bloodType: "B-",
      timestamp: "2024-03-15 11:00",
    },
  ]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInventoryChange = useCallback((bloodType, change) => {
    setPendingInventoryChanges((prev) => ({
      ...prev,
      [bloodType]: (prev[bloodType] || 0) + change,
    }));
  }, []);

  const saveInventoryChanges = useCallback(async () => {
    try {
      // Create updated inventory object
      const updatedInventory = { ...bloodInventory };

      // Apply pending changes
      Object.entries(pendingInventoryChanges).forEach(([bloodType, change]) => {
        updatedInventory[bloodType] = Math.max(
          0,
          (updatedInventory[bloodType] || 0) + change,
        );
      });

      // Here you would send the data to your backend
      // Example API call (commented out as it's a mock)
      // await fetch('/api/inventory/update', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedInventory)
      // });

      console.log("Sending updated inventory to backend:", updatedInventory);

      // Update local state
      setBloodInventory(updatedInventory);
      setPendingInventoryChanges({});

      // Add to inventory updates
      const updateType = "Updated";
      const timestamp = new Date().toLocaleString();

      setInventoryUpdates((prev) => [
        {
          type: updateType,
          units: Object.values(pendingInventoryChanges).reduce(
            (sum, val) => sum + Math.abs(val),
            0,
          ),
          bloodType: "Multiple",
          timestamp,
        },
        ...prev,
      ]);

      alert("Inventory updated successfully!");
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("Failed to update inventory. Please try again.");
    }
  }, [bloodInventory, pendingInventoryChanges]);

  return (
    <div className={styles.container}>
      <Header orgName={orgName} toggleMenu={toggleMenu} />

      {isMenuOpen && <Sidebar />}

      <main className={styles.mainContent}>
        <section className={styles.dashboardGrid}>
          <InventorySection
            bloodInventory={bloodInventory}
            pendingChanges={pendingInventoryChanges}
            onInventoryChange={handleInventoryChange}
            onSaveChanges={saveInventoryChanges}
          />
          <PendingDonationsSection />
          <div className={styles.flexContainer}>
            <CompletedDonationsSection
              completedDonations={completedDonations}
            />
          </div>
          <UrgentRequestsSection />
          <InventoryUpdatesSection inventoryUpdates={inventoryUpdates} />
        </section>
        <RecentActivitySection />
      </main>
    </div>
  );
}

export default BloodBankDashboard;
