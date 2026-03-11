import { useState } from "react";
import styles from "./css/Products.module.css";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
import ProductModal from "../components/ProductModal";
import AddCartModal from "../components/AddCartModal";

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
  const [activeTab, setActiveTab] = useState("newest");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase()),
  );

  function addToCart(product: Product) {
    try {
      const raw = localStorage.getItem("ps_cart") || "[]";
      const cart = JSON.parse(raw);

      const existing = cart.find((item: any) => item.id === product.id);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          qty: 1,
        });
      }

      localStorage.setItem("ps_cart", JSON.stringify(cart));

      // update badge
      window.dispatchEvent(new Event("cart-updated"));
    } catch (e) {
      console.error("cart error", e);
    }
  }

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

          <div className={styles.searchBox}>
            <input
              placeholder="ค้นหา..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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
            Price ↕
          </button>

          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "filter" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("filter")}
          >
            Filter ▾
          </button>
        </div>
      </header>

      {/* GRID */}
      <main className={styles.grid}>
        {filtered.map((p) => (
          <div
            key={p.id}
            className={styles.card}
            onClick={() => setSelectedProduct(p)}
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

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddCart={(product: Product) => {
              addToCart(product);
              setShowCartModal(true);
              setSelectedProduct(null);
            }}
          />
        )}

        {showCartModal && (
          <AddCartModal onClose={() => setShowCartModal(false)} />
        )}
      </main>
      {/* TABBAR */}
      <TabBar />
    </div>
  );
}
