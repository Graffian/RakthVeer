import React from "react";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const menuItems = [
    "Manage Donors",
    "Manage Inventory",
    "Donation Requests",
    "Donation Records",
    "Settings",
    "Contact Us",
  ];

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li className={styles.menuItem} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
