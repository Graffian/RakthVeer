"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RakthveerLandingPage.module.css";
import Header from "./Header";
import InfoCard from "./InfoCard";
import LoginButton from "./LoginButton";
import Footer from "./Footer";


function RakthveerLandingPage() {
  const navigate = useNavigate()
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish((prev) => !prev);
  };

  const navigateToDonorLogin = () => {
    navigate("/login");
  };

  const navigateToOrgLogin = () => {
    navigate("/orgLogin");
  };

  const donorBenefits = [
    "Free health checkup with donation",
    "Transport assistance available",
    "Multilingual support",
    "Mobile donation camps",
  ];

  const organizationBenefits = [
    "Organize blood donation camps",
    "Emergency blood support",
    "Blood storage facilities",
    "24/7 support available",
  ];

  // Add animation classes to elements when they come into view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(`.${styles.infoCard}`);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className={styles.container}>
      <Header toggleLanguage={toggleLanguage} />
      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <h2 className={styles.mainHeading}>Welcome to Rakthveer</h2>
          <h3 className={styles.subHeading}>
            Saving Lives, One Drop at a Time
          </h3>
          <p className={styles.description}>
            Empowering rural communities through accessible blood donation. Our
            mission is to connect donors with those in need, bringing
            life-saving services to every citizen.
          </p>

          <div className={styles.infoCardContainer}>
            <InfoCard title="For Rural Donors" listItems={donorBenefits} />
            <InfoCard
              title="For Organizations"
              listItems={organizationBenefits}
            />
          </div>

          <div className={styles.buttonContainer}>
            <LoginButton
              primary
              mainText="Login as Donor"
              onClick={navigateToDonorLogin}
            />
            <LoginButton
              mainText="Login as Organization"
              onClick={navigateToOrgLogin}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default RakthveerLandingPage;
