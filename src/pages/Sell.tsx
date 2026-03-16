import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
import SellQuickModal from "../components/SellQuickModal";
import SellFormModal from "../components/SellFormModal";
import SellDetailModal from "../components/SellDetailModal";
import styles from "./css/Sell.module.css";

type Category =
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

type SellerProduct = {
  id: string;
  status: "selling" | "sold";
  name: string;
  nameEn: string;
  price: number;
  img: string;
  desc: string;
  descEn: string;
  province: string;
  contact: string;
  used: string;
  age: string;
  remain: string;
  category: Category;
  createdAt: number;
  sold: number;
};

const LS_KEY = "ps_sell_items";

const sampleImages = [
  "/external/unsplash_1543852786-1cf6624b9987.jpg?auto=format&fit=crop&w=800&q=70",
  "/external/unsplash_1518791841217-8f162f1e1131.jpg?auto=format&fit=crop&w=800&q=70",
  "/external/unsplash_1495360010541-f48722b34f7d.jpg",
  "/external/unsplash_1592194996308-7b43878e84a6.jpg?auto=format&fit=crop&w=800&q=70",
  "/external/unsplash_1548681528-6a5c45b66b42.jpg?auto=format&fit=crop&w=800&q=70",
];

const categoryKeys: Category[] = [
  "food",
  "litter",
  "daily",
  "furniture",
  "toys",
  "collar",
  "leash",
  "outfit",
  "bow",
  "tag",
  "sweater",
  "hat",
  "other",
];

export default function Sell() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"selling" | "sold">("selling");
  const [items, setItems] = useState<SellerProduct[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed as SellerProduct[];
        }
      }
    } catch {
      // ignore malformed cache and seed defaults
    }

    const seed: SellerProduct[] = [
      {
        id: "a1",
        status: "selling",
        name: "Name 000111",
        nameEn: "Name 000111",
        price: 200,
        img: sampleImages[2],
        desc: "Lorem ipsum dolor sit amet",
        descEn: "Lorem ipsum dolor sit amet",
        province: "กรุงเทพฯ",
        contact: "09x-xxx-xxxx",
        used: "วันนี้",
        age: "30 วัน",
        remain: "10",
        category: "other",
        createdAt: Date.now() - 50000,
        sold: 0,
      },
      {
        id: "a2",
        status: "selling",
        name: "Name 000111",
        nameEn: "Name 000111",
        price: 200,
        img: sampleImages[1],
        desc: "Lorem ipsum dolor sit amet",
        descEn: "Lorem ipsum dolor sit amet",
        province: "กรุงเทพฯ",
        contact: "09x-xxx-xxxx",
        used: "วันนี้",
        age: "30 วัน",
        remain: "6",
        category: "other",
        createdAt: Date.now() - 40000,
        sold: 0,
      },
      {
        id: "a3",
        status: "sold",
        name: "Name 000111",
        nameEn: "Name 000111",
        price: 200,
        img: sampleImages[3],
        desc: "Lorem ipsum dolor sit amet",
        descEn: "Lorem ipsum dolor sit amet",
        province: "กรุงเทพฯ",
        contact: "09x-xxx-xxxx",
        used: "เมื่อวาน",
        age: "-",
        remain: "0",
        category: "other",
        createdAt: Date.now() - 30000,
        sold: 1,
      },
    ];
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
    return seed;
  });
  const [imgIndex, setImgIndex] = useState(0);

  const [openQuick, setOpenQuick] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeItem, setActiveItem] = useState<SellerProduct | null>(null);

  const [quickName, setQuickName] = useState("Name 000111");
  const [quickPrice, setQuickPrice] = useState("200");

  const [formName, setFormName] = useState("Name 000111");
  const [formDesc, setFormDesc] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  const [formProvince, setFormProvince] = useState("กรุงเทพฯ");
  const [formContact, setFormContact] = useState("09x-xxx-xxxx");
  const [formUsed, setFormUsed] = useState("วันนี้");
  const [formAge, setFormAge] = useState("30 วัน");
  const [formRemain, setFormRemain] = useState("10");

  const [notice, setNotice] = useState("");

  function persistItems(next: SellerProduct[]) {
    setItems(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));

    const userProducts = next
      .filter((item) => item.status === "selling")
      .map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        desc: item.desc,
        category: item.category,
        createdAt: item.createdAt,
        sold: item.sold,
      }));
    localStorage.setItem("ps_user_products", JSON.stringify(userProducts));
    globalThis.dispatchEvent(new Event("products-updated"));
  }

  const listedItems = useMemo(
    () => items.filter((item) => item.status === tab),
    [items, tab]
  );

  const labels = {
    topTitle: "ลงขายสินค้า",
    pageTitle: "รายการสินค้าของคุณ",
    selling: "กำลังขาย",
    sold: "ขายแล้ว",
    addTitle: "เพิ่มสินค้าใหม่",
    detailTitle: "รายละเอียดสินค้า",
    post: "ลงขาย",
    cancel: "ยกเลิก",
    addDetails: "เพิ่มรายละเอียด",
    postedSuccess: "ลงขายสำเร็จแล้ว",
    backToList: "กลับไปหน้ารายการ",
    tapToChange: "แตะรูปเพื่อเปลี่ยนตัวอย่าง",
    noData: "กด + เพื่อเพิ่มสินค้าชิ้นแรก",
    sellingPill: "กำลังขาย",
    soldPill: "ขายแล้ว",
  };

  function cycleImage() {
    setImgIndex((prev) => (prev + 1) % sampleImages.length);
  }

  function openQuickSheet() {
    setQuickName("Name 000111");
    setQuickPrice("200");
    setFormName("Name 000111");
    setFormDesc("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
    setFormProvince("กรุงเทพฯ");
    setFormContact("09x-xxx-xxxx");
    setFormUsed("วันนี้");
    setFormAge("30 วัน");
    setFormRemain("10");
    setNotice("");
    setOpenQuick(true);
  }

  function submitPost() {
    if (!quickName.trim() || !quickPrice.trim()) {
      setNotice("กรุณากรอกชื่อสินค้าและราคา");
      return;
    }

    const price = Number(quickPrice);
    if (Number.isNaN(price) || price <= 0) {
      setNotice("กรุณากรอกราคาให้ถูกต้อง");
      return;
    }

    const nextItem: SellerProduct = {
      id: `sell-${Date.now()}`,
      status: "selling",
      name: quickName.trim(),
      nameEn: quickName.trim(),
      price,
      img: sampleImages[imgIndex],
      desc: formDesc.trim() || "สินค้าจากผู้ใช้งาน",
      descEn: formDesc.trim() || "User product",
      province: formProvince.trim(),
      contact: formContact.trim(),
      used: formUsed.trim(),
      age: formAge.trim(),
      remain: formRemain.trim(),
      category: categoryKeys[imgIndex % categoryKeys.length],
      createdAt: Date.now(),
      sold: 0,
    };

    persistItems([nextItem, ...items]);
    setOpenQuick(false);
    setOpenForm(false);
    setShowSuccess(true);
    setTab("selling");
  }

  function openDetail(item: SellerProduct) {
    setActiveItem(item);
    setIsDetailOpen(true);
  }

  return (
    <div className={styles.app}>
      <header className={styles.top}>
        <div className={styles.topRow}>
          <button
            type="button"
            className={styles.back}
            aria-label="Back"
            onClick={() => navigate("/")}
          >
            <svg viewBox="0 0 24 24">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <div className={styles.topTitle}>{labels.topTitle}</div>
          <div className={styles.topGhost} />
        </div>
      </header>

      <main className={styles.content}>
        {!showSuccess && (
          <>
            <div className={styles.pageTitle}>{labels.pageTitle}</div>
            <div className={styles.segWrap} role="tablist" aria-label="Sell Tabs">
              <button
                type="button"
                className={`${styles.seg} ${tab === "selling" ? styles.active : ""}`}
                onClick={() => setTab("selling")}
              >
                {labels.selling}
              </button>
              <button
                type="button"
                className={`${styles.seg} ${tab === "sold" ? styles.active : ""}`}
                onClick={() => setTab("sold")}
              >
                {labels.sold}
              </button>
            </div>

            <section className={styles.grid}>
              {listedItems.length === 0 ? (
                <div className={styles.empty}>{labels.noData}</div>
              ) : (
                listedItems.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={styles.card}
                    onClick={() => openDetail(item)}
                  >
                    <div className={styles.imgWrap}>
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.name}>{item.name}</div>
                      <div className={styles.priceRow}>
                        <div className={styles.price}>{item.price.toLocaleString()} THB</div>
                        <div className={styles.statusPill}>
                          {item.status === "sold" ? labels.soldPill : labels.sellingPill}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </section>
          </>
        )}

        {showSuccess && (
          <section className={styles.successWrap}>
            <div className={styles.successCard}>
              <div className={styles.meowBox} />
              <p className={styles.meow}>Meow</p>
              <div className={styles.meowSub}>{labels.postedSuccess}</div>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => setShowSuccess(false)}
              >
                {labels.backToList}
              </button>
            </div>
          </section>
        )}
      </main>

      {!showSuccess && (
        <button type="button" className={styles.fab} aria-label="Add" onClick={openQuickSheet}>
          +
        </button>
      )}

      <SellQuickModal
        open={openQuick}
        onClose={() => setOpenQuick(false)}
        onCycleImage={cycleImage}
        imageSrc={sampleImages[imgIndex]}
        quickName={quickName}
        quickPrice={quickPrice}
        onChangeName={setQuickName}
        onChangePrice={setQuickPrice}
        onOpenForm={() => {
          setOpenQuick(false);
          setOpenForm(true);
        }}
        onSubmit={submitPost}
        notice={notice}
      />

      <SellFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onCycleImage={cycleImage}
        imageSrc={sampleImages[imgIndex]}
        formName={formName}
        formDesc={formDesc}
        formProvince={formProvince}
        formContact={formContact}
        formUsed={formUsed}
        formAge={formAge}
        formRemain={formRemain}
        onChangeName={setFormName}
        onChangeDesc={setFormDesc}
        onChangeProvince={setFormProvince}
        onChangeContact={setFormContact}
        onChangeUsed={setFormUsed}
        onChangeAge={setFormAge}
        onChangeRemain={setFormRemain}
        onConfirm={() => {
          setQuickName(formName);
          setOpenForm(false);
          setOpenQuick(true);
        }}
      />

      <SellDetailModal
        open={isDetailOpen}
        item={activeItem}
        onClose={() => setIsDetailOpen(false)}
      />

      <TabBar />
    </div>
  );
}
