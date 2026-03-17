import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import styles from "./css/Home.module.css";
import logo01 from "../assets/images/LOGO-01.png";
import marketIcon from "../assets/images/home/Market.png";
import shopIcon from "../assets/images/home/Our_shop.png";
import shareIcon from "../assets/images/home/share.png";
import bgImage from "../assets/images/home/BG.png";
export default function Home() {
  const navigate = useNavigate();

  function goPage(path: string) {
    navigate(path)
  }

  return (
    <Layout>
      <div 
        className={styles.homePage}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      >
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

      </div>
    </Layout>
  );
}
