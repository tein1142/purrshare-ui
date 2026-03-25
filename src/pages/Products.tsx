import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./css/Products.module.css";
import TabBar from "../components/TabBar";
import ProductModal from "../components/ProductModal";
import AddCartModal from "../components/AddCartModal";
import foodDryImg from "../assets/images/product/food/อาหารเม็ดแมว1.2kg.jpg";
import wetFoodImg from "../assets/images/product/food/อาหารเปียกแมว.jpg";
import catLickImg from "../assets/images/product/food/แมวเลีย.jpg";
import litterBoxImg from "../assets/images/product/toilet/กระบะทรายแมว.jpg";
import bentoniteLitterImg from "../assets/images/product/toilet/ทรายแมวเบนโทไนท์ สูตรควบคุมกลิ่น.jpg";
import autoToiletImg from "../assets/images/product/toilet/ห้องน้ำแมวอัตโนมัต.jpg";
import litterMatImg from "../assets/images/product/toilet/แผ่นดักทราย.jpg";
import nailClipperImg from "../assets/images/product/dailyItems/ที่ตัดเล็บแมว.jpg";
import nailFileImg from "../assets/images/product/dailyItems/ที่ฝนเล็บ.jpg";
import safeCollarImg from "../assets/images/product/dailyItems/ปลอกคอแมวนิรภัย.jpg";
import brushImg from "../assets/images/product/dailyItems/แปรงขนแมว.jpg";
import catBedImg from "../assets/images/product/furniture/ที่นอนแมว.jpg";
import wallCatHoleImg from "../assets/images/product/furniture/หลุมแมวติดกำแพง.jpg";
import catCushionImg from "../assets/images/product/furniture/เบาะนอนแมว.jpg";
import condoToyImg from "../assets/images/product/toys/ของเล่นคอนโดแมว.jpg";
import catnipToyImg from "../assets/images/product/toys/ของเล่นตุ๊กตายัดไส้กัญชาแมว.jpg";
import ballTrackImg from "../assets/images/product/toys/รางบอล.jpg";
import scratchingPostImg from "../assets/images/product/toys/ของเล่นลับเล็บแมว รุ่น Curved.jpg";
import collarBowImg from "../assets/images/product/fashion/collar/ปลอกคอโบว์คนสวย.jpg";
import collarHollowImg from "../assets/images/product/fashion/collar/ปลอกคอโบว์หล่อ.jpg";
import collarSmartImg from "../assets/images/product/fashion/collar/ปลอกคอแมวอัจฉริยะ.jpg";
import dressChristmasImg from "../assets/images/product/fashion/dress/ชุดคริสต์มาส.png";
import dressSushiImg from "../assets/images/product/fashion/dress/ชุดซูชิ.jpg";
import dressInterImg from "../assets/images/product/fashion/dress/ชุดปลอกคออินเตอร์.jpg";
import dressFakthongImg from "../assets/images/product/fashion/dress/ชุดฟักทอง.jpg";
import leashImg from "../assets/images/product/fashion/leash/สายจูง.jpg";
import leashReflectImg from "../assets/images/product/fashion/leash/สายจูงผึ้ง.jpg";
import specialtyFood1Img from "../assets/images/product/healthy/specialtyFood/อาหารสูตรกำจัดก้อนขน.jpg";
import specialtyFood2Img from "../assets/images/product/healthy/specialtyFood/อาหารสูตรเฉพาะทาง.jpg";
import specialtyFood3Img from "../assets/images/product/healthy/specialtyFood/อาหารแมวสูตรนิ่ว.png";
import careEquipment1Img from "../assets/images/product/healthy/careEquipment/กรรไกรตัดเล็บแมว.jpg";
import careEquipment2Img from "../assets/images/product/healthy/careEquipment/คอลล่าแมว.jpg";
import careEquipment3Img from "../assets/images/product/healthy/careEquipment/แปรงสีฟันแมว.jpg";
import cage1Img from "../assets/images/product/healthy/cage/กรงแมวในบ้าน.jpg";
import cage2Img from "../assets/images/product/healthy/cage/คอกแมวพับได้.jpg";
import cage3Img from "../assets/images/product/healthy/cage/คอกแมวแบบกล.jpg";

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
  | "clinical-food"
  | "care"
  | "cage"
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
    name: "อาหารเม็ดแมว 1.2kg",
    price: 359,
    img: foodDryImg,
    desc: "โปรตีนสูง ย่อยง่าย เหมาะกับแมวโต",
    category: "food",
    createdAt: 1711065600000,
    sold: 91,
  },
  {
    id: "p-13",
    name: "อาหารเปียกแมว",
    price: 189,
    img: wetFoodImg,
    desc: "อาหารเปียกสำหรับแมว รสชาติอร่อย",
    category: "food",
    createdAt: 1712000000000,
    sold: 67,
  },
  {
    id: "p-14",
    name: "ขนมแมวเลีย",
    price: 29,
    img: catLickImg,
    desc: "ขนมเลียสำหรับแมว ช่วยดูแลสุขภาพ",
    category: "food",
    createdAt: 1713000000000,
    sold: 145,
  },
  {
    id: "p-2",
    name: "ทรายแมวเบนโทไนท์ สูตรควบคุมกลิ่น",
    price: 249,
    img: bentoniteLitterImg,
    desc: "คุมกลิ่นดี ฝุ่นน้อย ใช้งานได้นาน",
    category: "litter",
    createdAt: 1712448000000,
    sold: 120,
  },
  {
    id: "p-15",
    name: "กระบะทรายแมว",
    price: 189,
    img: litterBoxImg,
    desc: "กระบะทรายขนาดพอเหมาะ ทนทาน",
    category: "litter",
    createdAt: 1712500000000,
    sold: 85,
  },
  {
    id: "p-16",
    name: "ห้องน้ำแมวอัตโนมัติ",
    price: 3590,
    img: autoToiletImg,
    desc: "ห้องน้ำอัตโนมัติ สะดวกสบาย",
    category: "litter",
    createdAt: 1712600000000,
    sold: 23,
  },
  {
    id: "p-17",
    name: "แผ่นดักทราย",
    price: 159,
    img: litterMatImg,
    desc: "แผ่นรองกระบะทราย กันทรายติดเท้า",
    category: "litter",
    createdAt: 1712700000000,
    sold: 67,
  },
  {
    id: "p-3",
    name: "ที่ตัดเล็บแมว",
    price: 189,
    img: nailClipperImg,
    desc: "ที่ตัดเล็บแมวคุณภาพดี ปลอดภัย",
    category: "daily",
    createdAt: 1713657600000,
    sold: 53,
  },
  {
    id: "p-18",
    name: "ที่ฝนเล็บแมว",
    price: 129,
    img: nailFileImg,
    desc: "ที่ฝนเล็บสำหรับแมว ให้ผิวเล็บเรียบเนียน",
    category: "daily",
    createdAt: 1713700000000,
    sold: 38,
  },
  {
    id: "p-19",
    name: "ปลอกคอแมวนิรภัย",
    price: 259,
    img: safeCollarImg,
    desc: "ปลอกคอนิรภัย ช่วยป้องกันอันตราย",
    category: "daily",
    createdAt: 1713800000000,
    sold: 71,
  },
  {
    id: "p-20",
    name: "แปรงขนแมว",
    price: 159,
    img: brushImg,
    desc: "แปรงขนนุ่ม ดูแลขนแมวได้ดี",
    category: "daily",
    createdAt: 1713900000000,
    sold: 92,
  },
  {
    id: "p-21",
    name: "ที่นอนแมว",
    price: 329,
    img: catBedImg,
    desc: "ที่นอนนุ่มสบาย เหมาะสำหรับแมวทุกสายพันธุ์",
    category: "furniture",
    createdAt: 1714000000000,
    sold: 64,
  },
  {
    id: "p-22",
    name: "หลุมแมวติดกำแพง",
    price: 589,
    img: wallCatHoleImg,
    desc: "หลุมแมวติดผนัง ประหยัดพื้นที่",
    category: "furniture",
    createdAt: 1714100000000,
    sold: 28,
  },
  {
    id: "p-23",
    name: "เบาะนอนแมว",
    price: 189,
    img: catCushionImg,
    desc: "เบาะนอนแมวนุ่ม พกพาสะดวก",
    category: "furniture",
    createdAt: 1714200000000,
    sold: 45,
  },
  {
    id: "p-31",
    name: "ของเล่นคอนโดแมว",
    price: 459,
    img: condoToyImg,
    desc: "คอนโดแมวพร้อมของเล่น ช่วยออกกำลังกาย",
    category: "toys",
    createdAt: 1720000000000,
    sold: 38,
  },
  {
    id: "p-32",
    name: "ของเล่นตุ๊กตายัดไส้กัญชาแมว",
    price: 89,
    img: catnipToyImg,
    desc: "ตุ๊กตากัญชาแมว ช่วยผ่อนคลายความเครียด",
    category: "toys",
    createdAt: 1720100000000,
    sold: 156,
  },
  {
    id: "p-33",
    name: "รางบอล",
    price: 259,
    img: ballTrackImg,
    desc: "รางบอลสำหรับแมว ช่วยกระตุ้นความสนใจ",
    category: "toys",
    createdAt: 1720200000000,
    sold: 67,
  },
  {
    id: "p-34",
    name: "ของเล่นลับเล็บแมว รุ่น Curved",
    price: 329,
    img: scratchingPostImg,
    desc: "เสาลับเล็บโค้งงอ ทนทาน",
    category: "toys",
    createdAt: 1714500000000,
    sold: 72,
  },
  {
    id: "p-6",
    name: "ปลอกคอโบว์คนสวย",
    price: 189,
    img: collarBowImg,
    desc: "ปลอกคอพร้อมโบว์สวยงาม",
    category: "collar",
    createdAt: 1717286400000,
    sold: 84,
  },
  {
    id: "p-35",
    name: "ปลอกคอโบว์หล่อ",
    price: 159,
    img: collarHollowImg,
    desc: "ปลอกคอโบว์หล่อเบาสบาย",
    category: "collar",
    createdAt: 1717300000000,
    sold: 67,
  },
  {
    id: "p-36",
    name: "ปลอกคอแมวอัจฉริยะ",
    price: 289,
    img: collarSmartImg,
    desc: "ปลอกคออัจฉริยะควบคุมอนความ",
    category: "collar",
    createdAt: 1717400000000,
    sold: 92,
  },
  {
    id: "p-7",
    name: "สายจูง",
    price: 239,
    img: leashImg,
    desc: "สายจูงเหนียวทน จับถนัดมือ",
    category: "leash",
    createdAt: 1718841600000,
    sold: 41,
  },
  {
    id: "p-37",
    name: "สายจูงผึ้ง",
    price: 289,
    img: leashReflectImg,
    desc: "สายจูงสะท้อนแสง มองเห็นในที่มืด",
    category: "leash",
    createdAt: 1718900000000,
    sold: 58,
  },
  {
    id: "p-8",
    name: "ชุดคริสต์มาส",
    price: 599,
    img: dressChristmasImg,
    desc: "ชุดคริสต์มาสสำหรับแมว",
    category: "outfit",
    createdAt: 1716000000000,
    sold: 41,
  },
  {
    id: "p-39",
    name: "ชุดซูชิ",
    price: 399,
    img: dressSushiImg,
    desc: "ชุดซูชิสไตล์สวยงาม",
    category: "outfit",
    createdAt: 1716100000000,
    sold: 35,
  },
  {
    id: "p-40",
    name: "ชุดปลอกคออินเตอร์",
    price: 459,
    img: dressInterImg,
    desc: "ชุดปลอกคออินเตอร์สวยงาม",
    category: "outfit",
    createdAt: 1716200000000,
    sold: 28,
  },
  {
    id: "p-41",
    name: "ชุดฟักทอง",
    price: 389,
    img: dressFakthongImg,
    desc: "ชุดฟักทองลายเรียบร้อย",
    category: "outfit",
    createdAt: 1716300000000,
    sold: 52,
  },
  {
    id: "p-42",
    name: "อาหารสูตรกำจัดก้อนขน",
    price: 459,
    img: specialtyFood1Img,
    desc: "อาหารสูตรพิเศษช่วยลดก้อนขน",
    category: "clinical-food",
    createdAt: 1716400000000,
    sold: 38,
  },
  {
    id: "p-43",
    name: "อาหารสูตรเฉพาะทาง",
    price: 529,
    img: specialtyFood2Img,
    desc: "อาหารเฉพาะทางสำหรับแมวที่ต้องการดูแลพิเศษ",
    category: "clinical-food",
    createdAt: 1716500000000,
    sold: 45,
  },
  {
    id: "p-44",
    name: "อาหารแมวสูตรนิ่ว",
    price: 389,
    img: specialtyFood3Img,
    desc: "อาหารสูตรนิ่ว เหมาะแมวสูงอายุ",
    category: "clinical-food",
    createdAt: 1716600000000,
    sold: 52,
  },
  {
    id: "p-45",
    name: "กรรไกรตัดเล็บแมว",
    price: 159,
    img: careEquipment1Img,
    desc: "กรรไกรตัดเล็บคุณภาพสูง",
    category: "care",
    createdAt: 1716700000000,
    sold: 67,
  },
  {
    id: "p-46",
    name: "คอลล่าแมว",
    price: 189,
    img: careEquipment2Img,
    desc: "คอลล่าแมวช่วยควบคุมอนความ",
    category: "care",
    createdAt: 1716800000000,
    sold: 83,
  },
  {
    id: "p-47",
    name: "แปรงสีฟันแมว",
    price: 129,
    img: careEquipment3Img,
    desc: "แปรงสีฟันนุ่ม ปลอดภัยสำหรับแมว",
    category: "care",
    createdAt: 1716900000000,
    sold: 71,
  },
  {
    id: "p-48",
    name: "กรงแมวในบ้าน",
    price: 1890,
    img: cage1Img,
    desc: "กรงแมวสำหรับใช้ในบ้าน ขนาดพอเหมาะ",
    category: "cage",
    createdAt: 1717000000000,
    sold: 29,
  },
  {
    id: "p-49",
    name: "คอกแมวพับได้",
    price: 2590,
    img: cage2Img,
    desc: "คอกแมวพับได้ พกพาสะดวก",
    category: "cage",
    createdAt: 1717100000000,
    sold: 18,
  },
  {
    id: "p-50",
    name: "คอกแมวแบบกล",
    price: 3290,
    img: cage3Img,
    desc: "คอกแมวแบบกล ทนทาน ใช้งานง่าย",
    category: "cage",
    createdAt: 1717200000000,
    sold: 22,
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
  cage: "กรง",
  food: "อาหารและโภชนาการ",
  litter: "ห้องน้ำและทรายแมว",
};

// Map from Select routeCat to product categories
const categoryGroupMapping: Record<string, ProductCategory[]> = {
  fashion: ["collar", "leash", "outfit", "bow", "tag", "sweater", "hat"],
  daily: ["toys", "furniture", "daily"],
  health: ["clinical-food", "care", "cage"],
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

    if (selectedCategory && selectedCategory !== "new" && selectedCategory !== "top") {
      // Check if this is a group category (fashion, daily, health)
      const groupCategories = categoryGroupMapping[selectedCategory];
      if (groupCategories) {
        list = list.filter((p) => groupCategories.includes(p.category));
      } else {
        // Direct category match
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    // Special handling for "fashion" category - show only 10 specific fashion products (3 collars + 3 leashes + 4 dresses)
    if (selectedCategory === "fashion") {
      const fashionProductIds = ["p-6", "p-35", "p-36", "p-7", "p-37", "p-8", "p-39", "p-40", "p-41"];
      list = list.filter((p) => fashionProductIds.includes(p.id));
    }

    // Special handling for "new" category - show only 3 specific newest products
    if (selectedCategory === "new") {
      const newestProductIds = ["p-31", "p-32", "p-33"];
      list = list.filter((p) => newestProductIds.includes(p.id));
    }

    // Special handling for "popular" category - show only the 3 specific popular products
    if (selectedCategory === "top") {
      const popularProductIds = ["p-2", "p-19", "p-34"];
      list = list.filter((p) => popularProductIds.includes(p.id));
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

        <div className={styles.title}>{subtitle}</div>
        <div className={styles.subtitle}>รายการสินค้า</div>

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
