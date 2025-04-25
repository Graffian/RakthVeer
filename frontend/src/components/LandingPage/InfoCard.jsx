import React from "react";
import styles from "./RakthveerLandingPage.module.css";

function InfoCard({ title, listItems, language }) {
  // Simple translations for demo purposes
  // In a real app, you would use a more robust translation system
  const translateItem = (item) => {
    if (language !== "hi") return item;

    const translations = {
      "Free health checkup with donation": "दान के साथ मुफ्त स्वास्थ्य जांच",
      "Transport assistance available": "परिवहन सहायता उपलब्ध",
      "Multilingual support": "बहुभाषी समर्थन",
      "Mobile donation camps": "मोबाइल दान शिविर",
      "Organize blood donation camps": "रक्तदान शिविर आयोजित करें",
      "Emergency blood support": "आपातकालीन रक्त समर्थन",
      "Blood storage facilities": "रक्त भंडारण सुविधाएं",
      "24/7 support available": "24/7 समर्थन उपलब्ध",
    };

    return translations[item] || item;
  };

  return (
    <article className={styles.infoCard}>
      <h4 className={styles.infoCardTitle}>{title}</h4>
      <ul className={styles.infoCardList}>
        {listItems.map((item, index) => (
          <li key={index}>{translateItem(item)}</li>
        ))}
      </ul>
    </article>
  );
}

export default InfoCard;
