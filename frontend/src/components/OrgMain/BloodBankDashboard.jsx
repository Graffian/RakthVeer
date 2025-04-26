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
import ArrivingDonorsSection from "./ArrivingDonorsSection";

function BloodBankDashboard() {
  const [orgName, setOrgName] = useState("City Blood Bank");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [processingDonors, setProcessingDonors] = useState([]);

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

  const [arrivingDonors, setArrivingDonors] = useState([
    {
      id: "d1",
      name: "Michael Chen",
      location: "2.3 miles away, Downtown",
      bloodType: "O+",
      eta: "5 min",
    },
    {
      id: "d2",
      name: "Sophia Rodriguez",
      location: "1.5 miles away, Westside",
      bloodType: "A-",
      eta: "10 min",
    },
    {
      id: "d3",
      name: "David Kim",
      location: "0.8 miles away, University Area",
      bloodType: "B+",
      eta: "3 min",
    },
    {
      id: "d4",
      name: "Aisha Johnson",
      location: "Just arrived, Waiting Room",
      bloodType: "AB+",
      eta: null,
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

  const sendToBackend = async (donorId, status) => {
    try {
      // Add donor to processing list
      setProcessingDonors((prev) => [...prev, donorId]);

      console.log(`Sending to backend: Donor ${donorId} status: ${status}`);

      await fetch('/api/donations/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donorId, status, timestamp: new Date() })
      });

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`Backend response received for donor ${donorId}`);
      return true;
    } catch (error) {
      console.error(`Error sending donation status to backend:`, error);
      return false;
    } finally {
      // Remove donor from processing list
      setProcessingDonors((prev) => prev.filter((id) => id !== donorId));
    }
  };

  const handleConfirmDonation = useCallback(
    async (donorId) => {
      // Find the donor
      const donor = arrivingDonors.find((d) => d.id === donorId);
      if (!donor) return;

      // Send data to backend
      const success = await sendToBackend(donorId, "donated");

      if (!success) {
        alert(`Failed to update donation status. Please try again.`);
        return;
      }

      // Update inventory with the donor's blood type
      const updatedInventory = { ...bloodInventory };
      const bloodType = donor.bloodType;
      updatedInventory[bloodType] = (updatedInventory[bloodType] || 0) + 1;
      setBloodInventory(updatedInventory);

      // Add to inventory updates
      const timestamp = new Date().toLocaleString();
      setInventoryUpdates((prev) => [
        {
          type: "Received",
          units: 1,
          bloodType: bloodType,
          timestamp,
        },
        ...prev,
      ]);

      // Remove donor from arriving list
      setArrivingDonors((prev) => prev.filter((d) => d.id !== donorId));

      // Add to completed donations
      setCompletedDonations((prev) => [
        {
          donor: donor.name,
          bloodType: donor.bloodType,
          date: new Date().toISOString().split("T")[0],
        },
        ...prev,
      ]);

      // Show success message
      alert(`Donation from ${donor.name} confirmed successfully!`);
    },
    [arrivingDonors, bloodInventory],
  );

  const handleRejectDonation = useCallback(
    async (donorId) => {
      // Find the donor
      const donor = arrivingDonors.find((d) => d.id === donorId);
      if (!donor) return;

      // Send data to backend
      const success = await sendToBackend(donorId, "not_donated");

      if (!success) {
        alert(`Failed to update donation status. Please try again.`);
        return;
      }

      // Remove donor from arriving list
      setArrivingDonors((prev) => prev.filter((d) => d.id !== donorId));

      // Show message
      alert(`${donor.name} marked as not donated.`);
    },
    [arrivingDonors],
  );

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
        <ArrivingDonorsSection
          arrivingDonors={arrivingDonors}
          processingDonors={processingDonors}
          onConfirmDonation={handleConfirmDonation}
          onRejectDonation={handleRejectDonation}
        />
        <RecentActivitySection />
      </main>
    </div>
  );
}

export default BloodBankDashboard;
