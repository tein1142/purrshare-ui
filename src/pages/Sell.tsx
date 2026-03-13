import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
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
  name: string;
  price: number;
  img: string;
  desc: string;
  category: Category;
  createdAt: number;
  sold: number;
};

const initialForm = {
  name: "",
  price: "",
  category: "food" as Category,
  desc: "",
  img: "",
};

const categoryLabel: Record<Category, string> = {
  food: "อาหารและโภชนาการ",
  litter: "ห้องน้ำและทรายแมว",
  daily: "ของใช้ประจำวัน",
  furniture: "เฟอร์นิเจอร์",
  toys: "ของเล่น",
  collar: "ปลอกคอ",
  leash: "สายจูง",
  outfit: "ชุดน่ารัก",
  bow: "โบว์",
  tag: "ป้ายชื่อ",
  sweater: "เสื้อกันหนาว",
  hat: "หมวก",
  other: "อื่นๆ",
};

export default function Sell() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [myProducts, setMyProducts] = useState<SellerProduct[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ps_user_products") || "[]";
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setMyProducts(parsed as SellerProduct[]);
      }
    } catch {
      setMyProducts([]);
    }
  }, []);

  function persistProducts(next: SellerProduct[]) {
    setMyProducts(next);
    localStorage.setItem("ps_user_products", JSON.stringify(next));
    window.dispatchEvent(new Event("products-updated"));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.price.trim()) {
      setNotice("กรุณากรอกชื่อสินค้าและราคา");
      return;
    }

    const price = Number(form.price);
    if (Number.isNaN(price) || price <= 0) {
      setNotice("กรุณากรอกราคาให้ถูกต้อง");
      return;
    }

    const nextItem: SellerProduct = {
      id: `user-${Date.now()}`,
      name: form.name.trim(),
      price,
      desc: form.desc.trim() || "สินค้าจากผู้ใช้งาน",
      img:
        form.img.trim() ||
        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4",
      category: form.category,
      createdAt: Date.now(),
      sold: 0,
    };

    const next = [nextItem, ...myProducts];
    persistProducts(next);
    setForm(initialForm);
    setNotice("บันทึกสินค้าเรียบร้อยแล้ว");
  }

  function removeItem(id: string) {
    const next = myProducts.filter((item) => item.id !== id);
    persistProducts(next);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.title}>ลงขายสินค้า</div>
        <div className={styles.subTitle}>เพิ่มสินค้าเพื่อทดสอบเดโม</div>
      </header>

      <main className={styles.content}>
        <form className={styles.formCard} onSubmit={onSubmit}>
          <label className={styles.label}>ชื่อสินค้า</label>
          <input
            className={styles.input}
            placeholder="ตัวอย่าง: เสื้อกันหนาวแมว"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label className={styles.label}>ราคา (THB)</label>
          <input
            className={styles.input}
            type="number"
            min="1"
            placeholder="เช่น 250"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <label className={styles.label}>หมวดหมู่</label>
          <select
            className={styles.input}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as Category })
            }
          >
            {Object.entries(categoryLabel).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <label className={styles.label}>รายละเอียด</label>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="บอกรายละเอียดสินค้าแบบสั้นๆ"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />

          <label className={styles.label}>ลิงก์รูปภาพ (ไม่บังคับ)</label>
          <input
            className={styles.input}
            placeholder="https://..."
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
          />

          <button className={styles.primaryBtn} type="submit">
            บันทึกสินค้า
          </button>

          <button
            className={styles.secondaryBtn}
            type="button"
            onClick={() => navigate(`/products?cat=${form.category}`)}
          >
            ไปดูในหน้าสินค้า
          </button>

          {notice && <div className={styles.notice}>{notice}</div>}
        </form>

        <section className={styles.listCard}>
          <div className={styles.listTitle}>สินค้าที่ฉันลงขาย ({myProducts.length})</div>

          {myProducts.length === 0 ? (
            <div className={styles.empty}>ยังไม่มีสินค้า ลองเพิ่มรายการแรกได้เลย</div>
          ) : (
            myProducts.slice(0, 6).map((item) => (
              <div key={item.id} className={styles.row}>
                <img className={styles.thumb} src={item.img} alt={item.name} />
                <div className={styles.meta}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.detail}>
                    {categoryLabel[item.category]} • {item.price} THB
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  type="button"
                  onClick={() => removeItem(item.id)}
                >
                  ลบ
                </button>
              </div>
            ))
          )}
        </section>
      </main>

      <TabBar />
    </div>
  );
}
