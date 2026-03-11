import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>jijocreations</div>
      <div className={styles.text}>
        Jijo creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;