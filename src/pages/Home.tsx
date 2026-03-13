import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";
import styles from "./css/Home.module.css";
export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [catJump, setCatJump] = useState(false);

  function goPage(path: string) {
    setIsLoading(true);
    setTimeout(() => setCatJump(true), 100);
    setTimeout(() => navigate(path), 1900);
  }

  return (
    <Layout>
      <div className={styles.homePage}>
        <img
          className={styles.logo}
          src="https://img5.pic.in.th/file/secure-sv1/LOGO-02248815be29cf3b94.png"
          alt="Purrshare"
        />
        <div className={styles.gridTop}>
          <button className={styles.tile} onClick={() => goPage("/select")} type="button">
            <img src="https://img2.pic.in.th/icon-20.png" alt="เลือกซื้อสินค้า" />
          </button>

          <button className={styles.tile} onClick={() => goPage("/sell")} type="button">
            <img src="https://img5.pic.in.th/file/secure-sv1/icon-21.png" alt="ลงขายสินค้า" />
          </button>
        </div>

        <div className={styles.gridBottom}>
          <button className={styles.tile} onClick={() => goPage("/donate")} type="button">
            <img src="https://img2.pic.in.th/icon-22.png" alt="บริจาค" />
          </button>
        </div>

        <div className={`${styles.loadingOverlay} ${isLoading ? styles.show : ""}`}>
          <img
            className={styles.loadingLogo}
            src="https://img5.pic.in.th/file/secure-sv1/LOGO-02248815be29cf3b94.png"
            alt=""
          />
          <div className={`${styles.cat} ${catJump ? styles.jump : ""}`}>🐱</div>
          <div className={styles.loadingText}>กําลังกระโดดไปหน้าใหม่...</div>
        </div>
      </div>
    </Layout>
  );
}
