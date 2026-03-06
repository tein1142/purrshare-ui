import { useNavigate, useLocation } from "react-router-dom";
import styles from "../pages/css/TabBar.module.css";

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={styles.tabbar}>
      <div
        className={`${styles.tab} ${isActive("/") ? styles.active : ""}`}
        onClick={() => navigate("/")}
      >
        <img
          className={styles.tabIconImg}
          src="https://img5.pic.in.th/file/secure-sv1/icon-168f8d5a7adad294f0.png"
        />
      </div>

      <div
        className={`${styles.tab} ${isActive("/star") ? styles.active : ""}`}
        onClick={() => navigate("/star")}
      >
        <img
          className={styles.tabIconImg}
          src="https://img5.pic.in.th/file/secure-sv1/icon-17.png"
        />
      </div>

      <div
        className={`${styles.tab} ${isActive("/cart") ? styles.active : ""}`}
        onClick={() => navigate("/cart")}
      >
        <img
          className={styles.tabIconImg}
          src="https://img5.pic.in.th/file/secure-sv1/icon-1507d739c217dd05c2.png"
        />
      </div>

      <div
        className={`${styles.tab} ${
          isActive("/profile") ? styles.active : ""
        }`}
        onClick={() => navigate("/profile")}
      >
        <img
          className={styles.tabIconImg}
          src="https://img5.pic.in.th/file/secure-sv1/icon-18.png"
        />
      </div>
    </nav>
  );
}