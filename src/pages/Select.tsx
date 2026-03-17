import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./css/Select.module.css";
import TabBar from "../components/TabBar";
import logo02 from "../assets/images/LOGO-02.png";
import foodIcon from "../assets/icons/Food.png";
import toiletIcon from "../assets/icons/Toilet.png";
import itemsIcon from "../assets/icons/Items.png";
import bedIcon from "../assets/icons/Bed.png";
import toysIcon from "../assets/icons/Toys.png";
import newIcon from "../assets/icons/New.png";
import topListIcon from "../assets/icons/Toplist.png";

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
      { name: "ปลอกคอ", cat: "collar", img: "/external/unsplash_1518791841217-8f162f1e1131.jpg", hint: "ลุคน่ารัก" },
      { name: "สายจูง", cat: "leash", img: "/external/unsplash_1543852786-1cf6624b9987.jpg", hint: "พาเดินเล่น" },
      { name: "ชุดน่ารัก", cat: "outfit", img: "/external/unsplash_1526336024174-e58f5cdd8e13.jpg", hint: "แต่งตัววันพิเศษ" },
      { name: "โบว์", cat: "bow", img: "/external/unsplash_1592194996308-7b43878e84a6.jpg", hint: "เพิ่มความคิวท์" },
      { name: "ป้ายชื่อ", cat: "tag", img: "/external/unsplash_1519052537078-e6302a4968d4.jpg", hint: "ปลอดภัยขึ้น" },
      { name: "เสื้อกันหนาว", cat: "sweater", img: "/external/unsplash_1503431128871-cd250803fa41.jpg", hint: "อบอุ่นสบาย" },
      { name: "หมวก", cat: "hat", img: "/external/unsplash_1532386236358-a33d8a9434e3.jpg", hint: "ถ่ายรูปขึ้น" },
    ],
  },
  {
    title: "ชีวิตประจำวัน",
    rowId: "dailyRow",
    routeCat: "daily",
    items: [
      { name: "ของเล่น", cat: "toys", img: "/external/unsplash_1518791841217-8f162f1e1131.jpg", hint: "เล่นเพลิน" },
      { name: "ชามอาหาร", cat: "bowl", img: "/external/unsplash_1543852786-1cf6624b9987.jpg", hint: "กินง่าย" },
      { name: "น้ำพุแมว", cat: "fountain", img: "/external/unsplash_1526336024174-e58f5cdd8e13.jpg", hint: "ดื่มน้ำมากขึ้น" },
      { name: "ที่นอน", cat: "bed", img: "/external/unsplash_1592194996308-7b43878e84a6.jpg", hint: "นุ่มหลับสบาย" },
      { name: "คอนโดแมว", cat: "condo", img: "/external/unsplash_1519052537078-e6302a4968d4.jpg", hint: "ปีนป่ายสนุก" },
      { name: "กรง/กระเป๋า", cat: "carrier", img: "/external/unsplash_1503431128871-cd250803fa41.jpg", hint: "เดินทางสะดวก" },
      { name: "แผ่นรอง", cat: "pad", img: "/external/unsplash_1532386236358-a33d8a9434e3.jpg", hint: "ทำความสะอาดง่าย" },
    ],
  },
  {
    title: "ดูแลสุขภาพ",
    rowId: "healthRow",
    routeCat: "health",
    items: [
      { name: "วิตามิน", cat: "vitamin", img: "/external/unsplash_1518791841217-8f162f1e1131.jpg", hint: "เสริมภูมิคุ้มกัน" },
      { name: "อาหารเฉพาะทาง", cat: "clinical-food", img: "/external/unsplash_1543852786-1cf6624b9987.jpg", hint: "ดูแลเฉพาะจุด" },
      { name: "ดูแลช่องปาก", cat: "dental", img: "/external/unsplash_1526336024174-e58f5cdd8e13.jpg", hint: "ลมหายใจสดชื่น" },
      { name: "แชมพู", cat: "shampoo", img: "/external/unsplash_1592194996308-7b43878e84a6.jpg", hint: "ขนนุ่มสะอาด" },
      { name: "บำรุงขน", cat: "coat", img: "/external/unsplash_1519052537078-e6302a4968d4.jpg", hint: "ลดขนร่วง" },
      { name: "ป้องกันเห็บหมัด", cat: "flea", img: "/external/unsplash_1503431128871-cd250803fa41.jpg", hint: "ป้องกันระยะยาว" },
      { name: "อุปกรณ์ดูแล", cat: "care", img: "/external/unsplash_1532386236358-a33d8a9434e3.jpg", hint: "ครบชุดดูแล" },
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
                  src={logo02}
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
                <img src={foodIcon} alt="อาหารและโภชนาการ" />
              </div>
              <span>อาหารและ<br />โภชนาการ</span>
            </button>

            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=litter")}>
              <div className={styles.quickIco}>
                <img src={toiletIcon} alt="ห้องน้ำและทรายแมว" />
              </div>
              <span>ห้องน้ำ<br />ทรายแมว</span>
            </button>

            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=daily")}>
              <div className={styles.quickIco}>
                <img src={itemsIcon} alt="ของใช้ประจำวัน" />
              </div>
              <span>ของใช้<br />ประจำวัน</span>
            </button>

            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=furniture")}>
              <div className={styles.quickIco}>
                <img src={bedIcon} alt="ที่นอนและเฟอร์นิเจอร์" />
              </div>
              <span>ที่นอน<br />เฟอร์นิเจอร์</span>
            </button>

            <button type="button" className={styles.quickCat} onClick={() => navigate("/products?cat=toys")}>
              <div className={styles.quickIco}>
                <img src={toysIcon} alt="ของเล่น" />
              </div>
              <span>ของเล่น</span>
            </button>
          </div>

          <div className={styles.bigButtons}>
            <button type="button" className={styles.bigBtn} onClick={() => navigate("/products?cat=new")}>
              <div className={styles.bigIco}>
                <img src={newIcon} alt="ของล่าสุด" />
              </div>
              <div className={styles.label}>ของล่าสุด</div>
            </button>

            <button type="button" className={styles.bigBtn} onClick={() => navigate("/products?cat=popular")}>
              <div className={styles.bigIco}>
                <img src={topListIcon} alt="ยอดนิยม" />
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
                      {/* <div className={styles.tileBadge}>หมวดแนะนำ</div> */}
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
