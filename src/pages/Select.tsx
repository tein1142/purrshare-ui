import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./css/Select.module.css";
import TabBar from "../components/TabBar";

type LifestyleItem = {
  name: string;
  cat: string;
  img: string;
  hint: string;
};

type LifestyleSection = {
  title: string;
  rowId: string;
  routeCat: string;
  items: LifestyleItem[];
};

const lifestyleSections: LifestyleSection[] = [
  {
    title: "แฟชั่น",
    rowId: "fashionRow",
    routeCat: "fashion",
    items: [
      { name: "ปลอกคอ", cat: "collar", img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", hint: "ลุคน่ารัก" },
      { name: "สายจูง", cat: "leash", img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987", hint: "พาเดินเล่น" },
      { name: "ชุดน่ารัก", cat: "outfit", img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13", hint: "แต่งตัววันพิเศษ" },
      { name: "โบว์", cat: "bow", img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6", hint: "เพิ่มความคิวท์" },
      { name: "ป้ายชื่อ", cat: "tag", img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4", hint: "ปลอดภัยขึ้น" },
      { name: "เสื้อกันหนาว", cat: "sweater", img: "https://images.unsplash.com/photo-1503431128871-cd250803fa41", hint: "อบอุ่นสบาย" },
      { name: "หมวก", cat: "hat", img: "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3", hint: "ถ่ายรูปขึ้น" },
    ],
  },
  {
    title: "ชีวิตประจำวัน",
    rowId: "dailyRow",
    routeCat: "daily",
    items: [
      { name: "ของเล่น", cat: "toys", img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", hint: "เล่นเพลิน" },
      { name: "ชามอาหาร", cat: "bowl", img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987", hint: "กินง่าย" },
      { name: "น้ำพุแมว", cat: "fountain", img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13", hint: "ดื่มน้ำมากขึ้น" },
      { name: "ที่นอน", cat: "bed", img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6", hint: "นุ่มหลับสบาย" },
      { name: "คอนโดแมว", cat: "condo", img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4", hint: "ปีนป่ายสนุก" },
      { name: "กรง/กระเป๋า", cat: "carrier", img: "https://images.unsplash.com/photo-1503431128871-cd250803fa41", hint: "เดินทางสะดวก" },
      { name: "แผ่นรอง", cat: "pad", img: "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3", hint: "ทำความสะอาดง่าย" },
    ],
  },
  {
    title: "ดูแลสุขภาพ",
    rowId: "healthRow",
    routeCat: "health",
    items: [
      { name: "วิตามิน", cat: "vitamin", img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", hint: "เสริมภูมิคุ้มกัน" },
      { name: "อาหารเฉพาะทาง", cat: "clinical-food", img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987", hint: "ดูแลเฉพาะจุด" },
      { name: "ดูแลช่องปาก", cat: "dental", img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13", hint: "ลมหายใจสดชื่น" },
      { name: "แชมพู", cat: "shampoo", img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6", hint: "ขนนุ่มสะอาด" },
      { name: "บำรุงขน", cat: "coat", img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4", hint: "ลดขนร่วง" },
      { name: "ป้องกันเห็บหมัด", cat: "flea", img: "https://images.unsplash.com/photo-1503431128871-cd250803fa41", hint: "ป้องกันระยะยาว" },
      { name: "อุปกรณ์ดูแล", cat: "care", img: "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3", hint: "ครบชุดดูแล" },
    ],
  },
];

function highlightCenterTile(row: HTMLElement) {
  const tiles = Array.from(row.querySelectorAll<HTMLElement>(".tile"));
  const bounds = row.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;

  let nearest: HTMLElement | null = null;
  let minDistance = Number.POSITIVE_INFINITY;

  for (const tile of tiles) {
    const tileBounds = tile.getBoundingClientRect();
    const tileCenterX = tileBounds.left + tileBounds.width / 2;
    const distance = Math.abs(tileCenterX - centerX);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = tile;
    }
  }

  for (const tile of tiles) {
    tile.classList.toggle("is-center", tile === nearest);
  }
}

export default function Select() {
  const navigate = useNavigate();

  useEffect(() => {
    const rows = lifestyleSections
      .map((section) => document.getElementById(section.rowId))
      .filter((row): row is HTMLElement => row instanceof HTMLElement);

    const cleanups = rows.map((row) => {
      let raf = 0;

      const update = () => {
        highlightCenterTile(row);
      };

      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      };

      row.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", update);
      update();

      return () => {
        row.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", update);
        cancelAnimationFrame(raf);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className={styles.selectPage}>
      <div className={styles.app}>
        <header className={styles.top}>
          <div className={styles.searchRow}>
            <div className={styles.brandMark}>
              <button
                type="button"
                className={styles.brandLink}
                onClick={() => navigate("/")}
                aria-label="กลับหน้าแรก"
              >
                <img
                  src="https://img5.pic.in.th/file/secure-sv1/LOGO-0383f8dd99c535b987.png"
                  alt="Purrshare"
                />
              </button>
            </div>

            <div className={styles.searchBox}>
              <input placeholder="ค้นหา..." />
            </div>

            {/* <button className={styles.actionBtn}>EN</button> */}
          </div>

          <div className={styles.sectionTitle}>หมวดหมู่สินค้า</div>

          <div className={styles.quickCats}>
            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=food")}>
              <div className={styles.quickIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-08.png" alt="อาหารและโภชนาการ" />
              </div>
              <span>อาหาร<br />และโภชนาการ</span>
            </button>

            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=litter")}>
              <div className={styles.quickIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-09415f32d6faf6a906.png" alt="ห้องน้ำและทรายแมว" />
              </div>
              <span>ห้องน้ำ<br />ทรายแมว</span>
            </button>

            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=daily")}>
              <div className={styles.quickIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-107aa0b07e7612da66.png" alt="ของใช้ประจำวัน" />
              </div>
              <span>ของใช้<br />ประจำวัน</span>
            </button>

            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=furniture")}>
              <div className={styles.quickIco}>
                <img src="https://img2.pic.in.th/icon-11.png" alt="ที่นอนและเฟอร์นิเจอร์" />
              </div>
              <span>ที่นอน<br />เฟอร์นิเจอร์</span>
            </button>

            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=toys")}>
              <div className={styles.quickIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-12b9ced998f5e338f6.png" alt="ของเล่น" />
              </div>
              <span>ของเล่น</span>
            </button>
          </div>

          <div className={styles.bigButtons}>
            <button type="button" className={styles.bigBtn} onClick={() => navigate("/products?cat=new")}>
              <div className={styles.bigIco}>
                <img src="https://img2.pic.in.th/icon-13.png" alt="ของใหม่ล่าสุด" />
              </div>
              <div className={styles.label}>ของใหม่ล่าสุด</div>
            </button>

            <button type="button" className={styles.bigBtn} onClick={() => navigate("/products?cat=popular")}>
              <div className={styles.bigIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-14.png" alt="ยอดนิยม" />
              </div>
              <div className={styles.label}>ยอดนิยม</div>
            </button>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.h1center}>แบ่งหมวดหมู่ตามไลฟ์สไตล์</div>
          <div className={styles.h1sub}>เลือกไลฟ์สไตล์ที่ใช่ แล้วแตะการ์ดเพื่อเข้าสินค้าทันที</div>

          {lifestyleSections.map((section) => (
            <section className={styles.lifestyleGroup} key={section.rowId}>
              <div className={styles.groupHeader}>
                <div className={styles.groupTitle}>{section.title}</div>
                <button
                  type="button"
                  className={styles.groupAction}
                  onClick={() => navigate(`/products?cat=${section.routeCat}`)}
                >
                  ดูทั้งหมด
                </button>
              </div>

              <div className={styles.carousel}>
                <div className={styles.row} id={section.rowId}>
                  {section.items.map((item) => (
                    <button
                      key={`${section.rowId}-${item.cat}`}
                      type="button"
                      className={`${styles.tile} tile`}
                      onClick={() => navigate(`/products?cat=${item.cat}`)}
                    >
                      <div className={styles.tileImg}>
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className={styles.tileBadge}>หมวดแนะนำ</div>
                      <div className={styles.name}>{item.name}</div>
                      <div className={styles.tileHint}>{item.hint}</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </main>

        <TabBar />
      </div>
    </div>
  );
}
