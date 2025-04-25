"use client";
import React, { useState } from "react";
import styles from "./RakthveerLandingPage.module.css";
import Header from "./Header";
import InfoCard from "./InfoCard";
import LoginButton from "./LoginButton";
import Footer from "./Footer";

function RakthveerLandingPage() {
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish((prev) => !prev);
  };
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
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

  // Translations for headings and description
  const translations = {
    mainHeading: {
      en: "Welcome to Rakthveer",
      hi: "रक्तवीर में आपका स्वागत है",
    },
    subHeading: {
      en: "Welcome to Raktveer",
      hi: "रक्तवीर में आपका स्वागत है",
    },
    description: {
      en: "Empowering rural communities through accessible blood donation. Our mission is to connect donors with those in need, bringing life-saving services to every citizen.",
      hi: "सुलभ रक्तदान के माध्यम से ग्रामीण समुदायों को सशक्त बनाना। हमारा मिशन दाताओं को जरूरतमंदों से जोड़ना है, जिससे हर नागरिक को जीवन रक्षक सेवाएं मिल सकें।",
    },
  };

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
          <h2 className={styles.mainHeading}>
            {translations.mainHeading[language]}
          </h2>
          <h3 className={styles.subHeading}>
            {translations.subHeading[language]}
          </h3>
          <p className={styles.description}>
            {translations.description[language]}
          </p>

          <div className={styles.infoCardContainer}>
            <InfoCard
              title={
                language === "en" ? "For Rural Donors" : "ग्रामीण दाताओं के लिए"
              }
              listItems={donorBenefits}
              language={language}
            />
            <InfoCard
              title={
                language === "en" ? "For Organizations" : "संस्थाओं के लिए"
              }
              listItems={organizationBenefits}
              language={language}
            />
          </div>

          <div className={styles.buttonContainer}>
            <LoginButton primary mainText="Login as Donor" />
            <LoginButton mainText="Login as Organization" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default RakthveerLandingPage;
