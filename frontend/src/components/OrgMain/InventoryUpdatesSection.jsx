import React from "react";
import styles from "./InventoryUpdatesSection.module.css";

function InventoryUpdatesSection({ inventoryUpdates }) {
  return (
    <section className={styles.updatesCard}>
      <h3 className={styles.sectionTitle}>Inventory Updates</h3>
      <div className={styles.updatesList}>
        {inventoryUpdates.map((update, index) => {
          const isReceived = update.type === "Received";
          const backgroundColor = isReceived
            ? "rgba(0, 128, 0, 0.05)"
            : "rgba(127, 2, 16, 0.05)";
          const statusColor = isReceived ? "rgb(0, 128, 0)" : "rgb(127, 2, 16)";

          return (
            <article
              className={styles.updateItem}
              key={index}
              style={{ backgroundColor }}
            >
              <div>
                <p className={styles.updateDetails}>
                  <span>{update.type}</span> <span>{update.units}</span>{" "}
                  <span>units of</span> <span>{update.bloodType}</span>
                </p>
                <time className={styles.timestamp}>{update.timestamp}</time>
              </div>
              <p className={styles.updateType} style={{ color: statusColor }}>
                {update.type}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default InventoryUpdatesSection;
