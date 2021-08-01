import React from "react";
import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} >
      <a href="" >Dummy</a>
      <br />
      { currentYear }
    </footer>
  )
}