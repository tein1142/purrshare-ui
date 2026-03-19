import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./css/Products.module.css";
import TabBar from "../components/TabBar";
import ProductModal from "../components/ProductModal";
import AddCartModal from "../components/AddCartModal";

type ProductCategory =
  | "food"
  | "litter"
  | "daily"
  | "furniture"
  | "toys"
  | "collar"
  | "leash"
  | "outfit"
  | "bow"
  | "tag"
  | "sweater"
  | "hat"
  | "other";

type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  desc: string;
  category: ProductCategory;
  createdAt: number;
  sold: number;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  qty: number;
};

const products: Product[] = [
  {
    id: "p-1",
    name: "อาหารแมวเกรดโฮลิสติก 1.5kg",
    price: 359,
    img: "/external/unsplash_1548681528-6a5c45b66b42.jpg",
    desc: "โปรตีนสูง ย่อยง่าย เหมาะกับแมวโต",
    category: "food",
    createdAt: 1711065600000,
    sold: 91,
  },
  {
    id: "p-2",
    name: "ทรายแมวจับตัวไว กลิ่นลาเวนเดอร์",
    price: 249,
    img: "/external/unsplash_1518791841217-8f162f1e1131.jpg",
    desc: "คุมกลิ่นดี ฝุ่นน้อย ใช้งานได้นาน",
    category: "litter",
    createdAt: 1712448000000,
    sold: 120,
  },
  {
    id: "p-3",
    name: "ชามอาหารสเตนเลสกันลื่น",
    price: 189,
    img: "/external/unsplash_1519052537078-e6302a4968d4.jpg",
    desc: "ทำความสะอาดง่าย เหมาะกับการใช้งานทุกวัน",
    category: "daily",
    createdAt: 1713657600000,
    sold: 53,
  },
  {
    id: "p-4",
    name: "ที่นอนแมวทรงโดนัท",
    price: 429,
    img: "/external/unsplash_1503431128871-cd250803fa41.jpg",
    desc: "นุ่มพิเศษ รองรับสรีระการนอนของแมว",
    category: "furniture",
    createdAt: 1714608000000,
    sold: 38,
  },
  {
    id: "p-5",
    name: "ของเล่นไม้ตกแมวพร้อมพู่",
    price: 119,
    img: "/external/unsplash_1532386236358-a33d8a9434e3.jpg",
    desc: "ช่วยกระตุ้นการเคลื่อนไหวและลดความเครียด",
    category: "toys",
    createdAt: 1716854400000,
    sold: 167,
  },
  {
    id: "p-6",
    name: "ปลอกคอผ้าลายจุด พร้อมกระดิ่ง",
    price: 189,
    img: "/external/unsplash_1592194996308-7b43878e84a6.jpg",
    desc: "นุ่ม เบา ปรับได้ 3 ระดับ",
    category: "collar",
    createdAt: 1717286400000,
    sold: 84,
  },
  {
    id: "p-7",
    name: "สายจูงไนลอนสะท้อนแสง",
    price: 239,
    img: "/external/unsplash_1543852786-1cf6624b9987.jpg",
    desc: "เหนียวทน จับถนัดมือ เหมาะเดินเล่นกลางคืน",
    category: "leash",
    createdAt: 1718841600000,
    sold: 41,
  },
  {
    id: "p-8",
    name: "เสื้อกันหนาวแมวลายสก็อต",
    price: 279,
    img: "/external/unsplash_1526336024174-e58f5cdd8e13.jpg",
    desc: "ผ้านิ่ม ใส่สบาย เหมาะอากาศเย็น",
    category: "sweater",
    createdAt: 1720051200000,
    sold: 29,
  },
  {
    id: "p-9",
    name: "ชุดน่ารักแมวลายสตริป",
    price: 349,
    img: "/external/unsplash_1545249390-6bdfa286032f.jpg",
    desc: "ชุดลายเรียบร้อย เหมาะถ่ายรูป",
    category: "outfit",
    createdAt: 1716000000000,
    sold: 41,
  },
  {
    id: "p-10",
    name: "โบว์สีทองประดับ",
    price: 129,
    img: "/external/unsplash_1584515933487-779824d29309.jpg",
    desc: "โบว์สุดน่ารักตรงลำคอแมว",
    category: "bow",
    createdAt: 1715700000000,
    sold: 134,
  },
  {
    id: "p-11",
    name: "ป้ายชื่อแมวทอง",
    price: 89,
    img: "/external/unsplash_1574158622682-e40e69881006.jpg",
    desc: "ป้ายชื่อแกะสลักชื่อแมวได้",
    category: "tag",
    createdAt: 1715900000000,
    sold: 203,
  },
  {
    id: "p-12",
    name: "หมวกสายรัดแมว",
    price: 159,
    img: "/external/unsplash_1583947582886-f40ec95dd752.jpg",
    desc: "หมวกแมวเบาเหมาะถ่ายรูป",
    category: "hat",
    createdAt: 1716100000000,
    sold: 87,
  },
];

const categoryLabel: Record<string, string> = {
  // หมวดหมู่หลัก (จากหน้า Select)
  fashion: "แฟชั่น",
  daily: "ชีวิตประจำวัน", 
  health: "สุขภาพ",
  new: "ของใหม่ล่าสุด",
  popular: "สินค้ายอดนิยม",
  
  // หมวดหมู่ย่อย (จากหน้า Select)
  collar: "ปลอกคอ",
  leash: "สายจูง", 
  outfit: "ชุดน่ารัก",
  bow: "โบว์",
  tag: "ป้ายชื่อ",
  hat: "หมวก",
  sweater: "เสื้อกันหนาว",
  toys: "ของเล่น",
  bowl: "ชามอาหาร",
  fountain: "น้ำพุแมว",
  bed: "ที่นอน",
  condo: "คอนโดแมว",
  carrier: "กรง/กระเป๋า",
  pad: "แผ่นรอง",
  furniture: "ที่นอนและเฟอร์นิเจอร์",
  vitamin: "วิตามิน",
  "clinical-food": "อาหารเฉพาะทาง",
  dental: "ดูแลช่องปาก",
  shampoo: "ทำความสะอาด",
  care: "อุปกรณ์ดูแล",
  food: "อาหารและโภชนาการ",
  litter: "ห้องน้ำและทรายแมว",
};

// Map from Select routeCat to product categories
const categoryGroupMapping: Record<string, ProductCategory[]> = {
  fashion: ["collar", "leash", "outfit", "bow", "tag", "sweater", "hat"],
  daily: ["toys", "furniture", "daily"],
  health: ["food", "daily"],
};

export default function Product() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("newest");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [customProducts, setCustomProducts] = useState<Product[]>([]);

  const selectedCategory = (searchParams.get("cat") || "").toLowerCase();

  useEffect(() => {
    const loadCustomProducts = () => {
      try {
        const raw = localStorage.getItem("ps_user_products") || "[]";
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          setCustomProducts([]);
          return;
        }
        setCustomProducts(parsed as Product[]);
      } catch {
        setCustomProducts([]);
      }
    };

    loadCustomProducts();
    globalThis.addEventListener("products-updated", loadCustomProducts);

    return () => {
      globalThis.removeEventListener("products-updated", loadCustomProducts);
    };
  }, []);

  const subtitle = selectedCategory
    ? categoryLabel[selectedCategory] || "หมวดหมู่สินค้า"
    : "Purrshare";

  const shownProducts = useMemo(() => {
    const merged = [...customProducts, ...products];

    let list = merged.filter((p) => {
      const normalizedQuery = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.desc.toLowerCase().includes(normalizedQuery)
      );
    });

    if (selectedCategory && selectedCategory !== "new" && selectedCategory !== "popular") {
      // Check if this is a group category (fashion, daily, health)
      const groupCategories = categoryGroupMapping[selectedCategory];
      if (groupCategories) {
        list = list.filter((p) => groupCategories.includes(p.category));
      } else {
        // Direct category match
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    // Sort based on sortBy
    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "top") {
      list = [...list].sort((a, b) => b.sold - a.sold);
    } else if (sortBy === "alphabetical") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // newest (default)
      list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    }

    return list;
  }, [customProducts, query, selectedCategory, sortBy]);

  function addToCart(product: Product) {
    try {
      const raw = localStorage.getItem("ps_cart") || "[]";
      const cart = JSON.parse(raw) as CartItem[];

      const existing = cart.find((item) => item.id === product.id);

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
      globalThis.dispatchEvent(new Event("cart-updated"));
    } catch (e) {
      console.error("cart error", e);
    }
  }

  const handlePriceSort = () => {
    setActiveTab("price");
    setPriceOrder(prev => prev === "asc" ? "desc" : "asc");
    setSortBy(priceOrder === "asc" ? "price-desc" : "price-asc");
  };

  const getPriceEmoji = () => {
    return priceOrder === "asc" ? "↑" : "↓";
  };

  const handleFilterToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getFilterEmoji = () => {
    return dropdownOpen ? "▴" : "▾";
  };

  const handleSortOption = (option: string) => {
    setSortBy(option);
    setDropdownOpen(false);
    
    // Update activeTab and related states
    if (option === "newest") {
      setActiveTab("newest");
    } else if (option === "top") {
      setActiveTab("top");
    } else if (option === "price-asc") {
      setActiveTab("price");
      setPriceOrder("asc");
    } else if (option === "price-desc") {
      setActiveTab("price");
      setPriceOrder("desc");
    } else if (option === "alphabetical") {
      setActiveTab("alphabetical");
    }
  };

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
        <div className={styles.subtitle}>{subtitle}</div>

        <div className={styles.controls}>
          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "newest" ? styles.active : ""
            }`}
            onClick={() => {
              setActiveTab("newest");
              setSortBy("newest");
            }}
          >
            Newest
          </button>

          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "top" ? styles.active : ""
            }`}
            onClick={() => {
              setActiveTab("top");
              setSortBy("top");
            }}
          >
            Top
          </button>

          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "price" ? styles.active : ""
            }`}
            onClick={handlePriceSort}
          >
            Price {getPriceEmoji()}
          </button>

          <button
            className={`${styles.ctrlBtn} ${
              activeTab === "filter" ? styles.active : ""
            }`}
            onClick={handleFilterToggle}
          >
            Filter {getFilterEmoji()}
          </button>
          
          {dropdownOpen && (
            <div className={styles.dropdown}>
              <button
                className={`${styles.dropdownItem} ${
                  sortBy === "newest" ? styles.active : ""
                }`}
                onClick={() => handleSortOption("newest")}
              >
                สินค้าล่าสุด
              </button>
              <button
                className={`${styles.dropdownItem} ${
                  sortBy === "top" ? styles.active : ""
                }`}
                onClick={() => handleSortOption("top")}
              >
                ยอดนิยม
              </button>
              <button
                className={`${styles.dropdownItem} ${
                  sortBy === "price-asc" ? styles.active : ""
                }`}
                onClick={() => handleSortOption("price-asc")}
              >
                ราคา: น้อย → มาก
              </button>
              <button
                className={`${styles.dropdownItem} ${
                  sortBy === "price-desc" ? styles.active : ""
                }`}
                onClick={() => handleSortOption("price-desc")}
              >
                ราคา: มาก → น้อย
              </button>
              <button
                className={`${styles.dropdownItem} ${
                  sortBy === "alphabetical" ? styles.active : ""
                }`}
                onClick={() => handleSortOption("alphabetical")}
              >
                เรียงตามตัวอักษร
              </button>
            </div>
          )}
        </div>
      </header>

      {/* GRID */}
      <main className={styles.grid}>
        {shownProducts.map((p) => (
          <button
            key={p.id}
            type="button"
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
          </button>
        ))}

        {!shownProducts.length && (
          <div className={styles.emptyState}>
            ไม่พบสินค้าที่ตรงเงื่อนไข ลองเปลี่ยนหมวดหรือคำค้นหา
          </div>
        )}

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
