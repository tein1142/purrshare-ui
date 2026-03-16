import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import Layout from "../components/Layout";
import styles from "./css/Home.module.css";
import logo01 from "../assets/images/LOGO-01.png";
import marketIcon from "../assets/images/home/Market.png";
import shopIcon from "../assets/images/home/Our_shop.png";
import shareIcon from "../assets/images/home/share.png";
export default function Home() {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  // const [catJump, setCatJump] = useState(false);

  function goPage(path: string) {
    // setIsLoading(true);
    // setTimeout(() => setCatJump(true), 100);
    // setTimeout(() => , 100);
    navigate(path)
  }

  return (
    <Layout>
      <div className={styles.homePage}>
        <img
          className={styles.logo}
          src={logo01}
          alt="Purrshare"
        />
        <div className={styles.gridTop}>
          <button className={styles.tile} onClick={() => goPage("/select")} type="button">
            <img src={marketIcon} alt="เลือกซื้อสินค้า" />
          </button>

          <button className={styles.tile} onClick={() => goPage("/sell")} type="button">
            <img src={shopIcon} alt="ลงขายสินค้า" />
          </button>
        </div>

        <div className={styles.gridBottom}>
          <button className={styles.tile} onClick={() => goPage("/donate")} type="button">
            <img src={shareIcon} alt="บริจาค" />
          </button>
        </div>

        {/* <div className={`${styles.loadingOverlay} ${isLoading ? styles.show : ""}`}>
          <img
            className={styles.loadingLogo}
            src={logo01}
            alt=""
          />
          <div className={`${styles.cat} ${catJump ? styles.jump : ""}`}>🐱</div>
          <div className={styles.loadingText}>กําลังกระโดดไปหน้าใหม่...</div>
        </div> */}
      </div>
    </Layout>
  );
}
