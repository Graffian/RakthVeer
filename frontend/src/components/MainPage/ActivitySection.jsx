"use client";
import React, { useState } from "react";
import styles from "./InputDesign.module.css";

function ActivitySection() {
  const [recentActivities] = useState([
    {
      title: "Blood Donation Success",
      description:
        "John Smith (B+) donated blood to Mary Wilson at AIIMS Hospital",
      time: "2 hours ago",
    },
    {
      title: "Emergency Request Fulfilled",
      description: "Sarah Johnson (A-) donated blood at Apollo Hospitals",
      time: "5 hours ago",
    },
    {
      title: "New Donor Registration",
      description: "10 new donors registered at CARE Hospitals camp",
      time: "Yesterday",
    },
  ]);

  const [upcomingCamps] = useState([
    {
      name: "Community Blood Drive",
      location: "Town Hall, Bhubaneswar",
      date: "Tomorrow, 9 AM - 4 PM",
    },
    {
      name: "College Campus Drive",
      location: "KIIT University",
      date: "May 1st, 10 AM - 5 PM",
    },
    {
      name: "Corporate Blood Donation Camp",
      location: "Infocity, Bhubaneswar",
      date: "May 5th, 11 AM - 6 PM",
    },
  ]);

  return (
    <section className={styles.activityContainer}>
      <h2 className={styles.activityTitle}>Recent Activities & News</h2>
      <div className={styles.activitiesList}>
        {recentActivities.map((activity, index) => (
          <article className={styles.activityCard} key={index}>
            <h3 className={styles.activityHeading}>{activity.title}</h3>
            <p className={styles.activityDescription}>{activity.description}</p>
            <p className={styles.activityTime}>{activity.time}</p>
          </article>
        ))}
      </div>

      <h2 className={styles.campsTitle}>Upcoming Donation Camps</h2>
      <div className={styles.campsList}>
        {upcomingCamps.map((camp, index) => (
          <article className={styles.campCard} key={index}>
            <h3 className={styles.campName}>{camp.name}</h3>
            <p className={styles.campLocation}>{camp.location}</p>
            <p className={styles.campDate}>{camp.date}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ActivitySection;
