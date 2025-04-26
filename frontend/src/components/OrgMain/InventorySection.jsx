import React, { useMemo } from "react";
import styles from "./InventorySection.module.css";

function InventorySection({
  bloodInventory,
  pendingChanges,
  onInventoryChange,
  onSaveChanges,
}) {
  const getUpdatedCount = useMemo(
    () => (type) => {
      const currentCount = bloodInventory[type] || 0;
      const pendingChange = pendingChanges[type] || 0;
      return currentCount + pendingChange;
    },
    [bloodInventory, pendingChanges],
  );

  const hasPendingChanges = useMemo(() => {
    return Object.keys(pendingChanges).length > 0;
  }, [pendingChanges]);
  return (
    <section className={styles.inventoryCard}>
      <h3 className={styles.sectionHeader}>
        <span>Available Units</span>
        <div className={styles.buttonGroup}>
          {hasPendingChanges && (
            <button className={styles.saveButton} onClick={onSaveChanges}>
              Save Changes
            </button>
          )}
          <button className={styles.actionButton}>Manage Inventory</button>
        </div>
      </h3>
      <table className={styles.inventoryTable}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.leftAlign}>Blood Type</th>
            <th className={styles.rightAlign}>Available Units</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(bloodInventory).map(([type, count]) => (
            <tr className={styles.tableRow} key={type}>
              <td className={styles.bloodType}>{type}</td>
              <td className={styles.unitControls}>
                <button
                  className={styles.controlButton}
                  onClick={() => onInventoryChange(type, -1)}
                  disabled={getUpdatedCount(type) <= 0}
                >
                  -
                </button>
                <span className={styles.unitCount}>
                  {getUpdatedCount(type)}
                  {pendingChanges[type] ? (
                    <span className={styles.pendingChange}>
                      {pendingChanges[type] > 0
                        ? `(+${pendingChanges[type]})`
                        : `(${pendingChanges[type]})`}
                    </span>
                  ) : null}
                </span>
                <button
                  className={styles.controlButton}
                  onClick={() => onInventoryChange(type, 1)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default InventorySection;
