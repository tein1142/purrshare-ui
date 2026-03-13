import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../pages/css/TabBar.module.css";

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartQty, setCartQty] = useState(0);

  const isActive = (path: string) => location.pathname === path;

  const tabs = useMemo(
    () => [
      {
        key: "home",
        path: "/",
        label: "หน้าแรก",
        icon: "https://img5.pic.in.th/file/secure-sv1/icon-168f8d5a7adad294f0.png",
      },
      {
        key: "star",
        path: "/star",
        label: "อันดับ",
        icon: "https://img5.pic.in.th/file/secure-sv1/icon-17.png",
      },
      {
        key: "cart",
        path: "/cart",
        label: "ตะกร้า",
        icon: "https://img5.pic.in.th/file/secure-sv1/icon-1507d739c217dd05c2.png",
      },
      {
        key: "profile",
        path: "/profile",
        label: "โปรไฟล์",
        icon: "https://img5.pic.in.th/file/secure-sv1/icon-18.png",
      },
    ],
    []
  );

  useEffect(() => {
    function updateQty() {
      try {
        const raw = localStorage.getItem("ps_cart") || "[]";
        const items = JSON.parse(raw) as Array<{ qty?: number }>;
        const total = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
        setCartQty(total);
      } catch {
        setCartQty(0);
      }
    }

    updateQty();
    globalThis.addEventListener("cart-updated", updateQty);
    globalThis.addEventListener("storage", updateQty);
    globalThis.addEventListener("focus", updateQty);

    return () => {
      globalThis.removeEventListener("cart-updated", updateQty);
      globalThis.removeEventListener("storage", updateQty);
      globalThis.removeEventListener("focus", updateQty);
    };
  }, []);

  return (
    <nav className={styles.tabbar}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.tab} ${isActive(tab.path) ? styles.active : ""}`}
          onClick={() => navigate(tab.path)}
          type="button"
        >
          <div className={styles.tabIcoWrap}>
            <img className={styles.tabIconImg} src={tab.icon} alt={tab.label} />
            {tab.key === "cart" && (
              <span className={`${styles.tabBadge} ${cartQty > 0 ? styles.show : ""}`}>
                {cartQty}
              </span>
            )}
          </div>
          <span className={styles.tabLabel}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}