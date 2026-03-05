import { useState } from "react";
import styles from "./css/Products.module.css";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  desc: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "ปลอกคอผ้าลายจุด พร้อมกระดิ่ง",
    price: 189,
    img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
    desc: "นุ่ม เบา ปรับได้ 3 ระดับ",
  },
  {
    id: "2",
    name: "ปลอกคอหนังเทียม Minimal",
    price: 259,
    img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    desc: "ดูแพง ใส่สบาย ไม่บาดขน",
  },
];

export default function Product() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("newest");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className={styles.app}>
      {/* HEADER */}
      <header className={styles.top}>
        <div className={styles.topRow}>
          <a className={styles.backBtn} href="/select" aria-label="กลับ">
            <svg viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </a>

          {/* <div className={styles.searchWrap}>
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16.2 16.2l4.2 4.2" />
            </svg>
          </div> */}

            <div className={styles.searchBox}>
              <input placeholder="ค้นหา..." />
            </div>
        </div>

        <div className={styles.title}>รายการสินค้า</div>
        <div className={styles.subtitle}>Purrshare</div>

        <div className={styles.controls}>
          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "newest" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("newest")}
          >
            Newest
          </button>

          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "top" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("top")}
          >
            Top
          </button>

          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "price" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("price")}
          >
            Price
          </button>

          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "filter" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("filter")}
          >
            Filter
          </button>
        </div>
      </header>

      {/* GRID */}
      <main className={styles.grid}>
        {filtered.map((p) => (
          <div
            key={p.id}
            className={styles.card}
            onClick={() => setSelected(p)}
          >
            <div className={styles.thumb}>
              <img src={p.img} alt={p.name} />
            </div>

            <div className={styles.meta}>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.desc}>{p.desc}</div>
              <div className={styles.price}>
                {p.price.toLocaleString("th-TH")} THB
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* PRODUCT DETAIL */}
      {selected && (
        <div
          className={`${styles.pOverlay} ${styles.show}`}
          onClick={() => setSelected(null)}
        >
          <div className={styles.pSheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.pTop}>
              <button
                className={styles.pClose}
                onClick={() => setSelected(null)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div className={styles.pTopTitle}>รายละเอียดสินค้า</div>

              <div className={styles.pTopRight}></div>
            </div>

            <div className={styles.pBody}>
              <div className={styles.pCard}>
                <div className={styles.pImage}>
                  <img src={selected.img} alt={selected.name} />
                </div>

                <div className={styles.pInfo}>
                  <div className={styles.pName}>{selected.name}</div>

                  <div className={styles.pDesc}>{selected.desc}</div>

                  <div className={styles.pPrice}>
                    {selected.price.toLocaleString("th-TH")} THB
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.pBottom}>
              <div className={styles.pBottomPrice}>
                {selected.price.toLocaleString("th-TH")} THB
              </div>

              <div className={styles.pBottomActions}>
                <button className={styles.ctaBtn}>โปรไฟล์ผู้ขาย</button>

                <button className={`${styles.ctaBtn} ${styles.primary}`}>
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TABBAR */}
      <nav className={styles.tabbar}>
        <div
          className={`${styles.tab} ${styles.active}`}
          onClick={() => navigate("/")}
        >
          <img
            className={styles.tabIconImg}
            src="https://img5.pic.in.th/file/secure-sv1/icon-168f8d5a7adad294f0.png"
          />
        </div>

        <div className={styles.tab} onClick={() => navigate("/star")}>
          <img
            className={styles.tabIconImg}
            src="https://img5.pic.in.th/file/secure-sv1/icon-17.png"
          />
        </div>

        <div className={styles.tab} onClick={() => navigate("/cart")}>
          <img
            className={styles.tabIconImg}
            src="https://img5.pic.in.th/file/secure-sv1/icon-1507d739c217dd05c2.png"
          />
        </div>

        <div className={styles.tab} onClick={() => navigate("/profile")}>
          <img
            className={styles.tabIconImg}
            src="https://img5.pic.in.th/file/secure-sv1/icon-18.png"
          />
        </div>
      </nav>
    </div>
  );
}
