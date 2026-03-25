import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
import SellQuickModal from "../components/SellQuickModal";
import SellFormModal from "../components/SellFormModal";
import SellDetailModal from "../components/SellDetailModal";
import styles from "./css/Sell.module.css";
import trayImg from "../assets/images/product/sell/กระบะทราย.jpg";
import fountainImg from "../assets/images/product/sell/น้ำพุแมว.jpg";
import logo02 from "../assets/images/LOGO-02.png";
// Additional sample images from various categories
import foodDryImg from "../assets/images/product/food/อาหารเม็ดแมว1.2kg.jpg";
import wetFoodImg from "../assets/images/product/food/อาหารเปียกแมว.jpg";
import catLickImg from "../assets/images/product/food/แมวเลีย.jpg";
import nailClipperImg from "../assets/images/product/dailyItems/ที่ตัดเล็บแมว.jpg";
import brushImg from "../assets/images/product/dailyItems/แปรงขนแมว.jpg";
import catBedImg from "../assets/images/product/furniture/ที่นอนแมว.jpg";
import catnipToyImg from "../assets/images/product/toys/ของเล่นตุ๊กตายัดไส้กัญชาแมว.jpg";
import collarBowImg from "../assets/images/product/fashion/collar/ปลอกคอโบว์คนสวย.jpg";
import specialtyFood1Img from "../assets/images/product/healthy/specialtyFood/อาหารสูตรกำจัดก้อนขน.jpg";

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
  | "clinical-food"
  | "care"
  | "cage"
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
  trayImg,
  fountainImg,
  foodDryImg,
  wetFoodImg,
  catLickImg,
  nailClipperImg,
  brushImg,
  catBedImg,
  catnipToyImg,
  collarBowImg,
  specialtyFood1Img,
  trayImg, // Add some variety by repeating
  fountainImg,
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
  "clinical-food",
  "care",
  "cage",
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
        name: "อาหารแมว MeowMix 1kg",
        nameEn: "MeowMix Cat Food 1kg",
        price: 200,
        img: foodDryImg,
        desc: "อาหารแมวชนิดเม็ด สำหรับแมวโต อายุ 1 ปีขึ้นไป",
        descEn: "Dry cat food for adult cats, 1 year+",
        province: "กรุงเทพฯ",
        contact: "089-123-4567",
        used: "วันนี้",
        age: "30 วัน",
        remain: "10",
        category: "food",
        createdAt: Date.now() - 50000,
        sold: 0,
      },
      {
        id: "a2",
        status: "selling",
        name: "ทรายแมว OdourLock 5L",
        nameEn: "OdourLock Cat Litter 5L",
        price: 180,
        img: trayImg,
        desc: "ทรายแมวเก็บกลิ่น กำจัดกลิ่นเหม็นได้ดี",
        descEn: "Odour control cat litter, 5L bag",
        province: "นนทบุรี",
        contact: "081-234-5678",
        used: "วันนี้",
        age: "30 วัน",
        remain: "6",
        category: "litter",
        createdAt: Date.now() - 40000,
        sold: 0,
      },
      {
        id: "a3",
        status: "sold",
        name: "ของเล่นแมว น้องหมี",
        nameEn: "Cat Toy Bear",
        price: 99,
        img: catnipToyImg,
        desc: "ของเล่นเสริมพัฒนาการ สำหรับแมวทุกวัย",
        descEn: "Interactive toy for all cat ages",
        province: "สมุทรปราการ",
        contact: "086-345-6789",
        used: "เมื่อวาน",
        age: "-",
        remain: "0",
        category: "toys",
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

  const [quickName, setQuickName] = useState("");
  const [quickPrice, setQuickPrice] = useState("");

  const [formName, setFormName] = useState("ทรายแมว OdourLock 5L");
  const [formDesc, setFormDesc] = useState("ทรายแมวเก็บกลิ่น กำจัดกลิ่นเหม็นได้ดี");
  const [formProvince, setFormProvince] = useState("นนทบุรี");
  const [formContact, setFormContact] = useState("081-234-5678");
  const [formUsed, setFormUsed] = useState("วันนี้");
  const [formAge, setFormAge] = useState("30 วัน");
  const [formRemain, setFormRemain] = useState("6");

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
    setQuickName("");
    setQuickPrice("");
    setFormName("ทรายแมว OdourLock 5L");
    setFormDesc("ทรายแมวเก็บกลิ่น กำจัดกลิ่นเหม็นได้ดี");
    setFormProvince("นนทบุรี");
    setFormContact("081-234-5678");
    setFormUsed("วันนี้");
    setFormAge("30 วัน");
    setFormRemain("6");
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
            <img src={logo02} alt="Back" className={styles.backIcon} />
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
