import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
import styles from "./css/Donate.module.css";
import litterImg from "../assets/images/product/donate/ทรายแมว.jpg";
import feedbackImg from "../assets/images/feedback.jpg";
import woundDressingImg from "../assets/images/product/donate/ผ้าก๊อซทำแผล.jpg";
import blanketImg from "../assets/images/product/donate/ผ้าห่ม.jpg";
import cottonImg from "../assets/images/product/donate/สำลี.jpg";
import wetFoodImg from "../assets/images/product/donate/อาหารเปียก.jpg";
import logo02 from "../assets/images/LOGO-02.png";

type NeedItem = {
  id: string;
  name: string;
  meta: string;
  img: string;
  current: number;
  target: number;
  catalogId: string;
};

const needsSeed: NeedItem[] = [
  {
    id: "pads",
    name: "สำลีแผ่น",
    meta: "34 / 200 ชิ้น",
    img: cottonImg,
    current: 34,
    target: 200,
    catalogId: "toy",
  },
  {
    id: "wetfood",
    name: "อาหารเปียก",
    meta: "67 / 100 ชิ้น",
    img: wetFoodImg,
    current: 67,
    target: 100,
    catalogId: "food",
  },
  {
    id: "wound",
    name: "ผ้าก๊อตทำแผล",
    meta: "23 / 50 ชิ้น",
    img: woundDressingImg,
    current: 23,
    target: 50,
    catalogId: "toy",
  },
  {
    id: "litter-need",
    name: "ทรายแมว",
    meta: "12 / 80 ชิ้น",
    img: litterImg,
    current: 12,
    target: 80,
    catalogId: "litter",
  },
  {
    id: "blanket",
    name: "ผ้าห่ม/ผ้าขนหนู",
    meta: "9 / 60 ชิ้น",
    img: blanketImg,
    current: 9,
    target: 60,
    catalogId: "bed",
  },
];

export default function Donate() {
  const navigate = useNavigate();
  const fallbackImage = feedbackImg;
  const [search] = useState("");
  const [needs, setNeeds] = useState<NeedItem[]>(() =>
    needsSeed.map((item) => ({
      ...item,
      current: 0,
      meta: `0/${item.target}`,
    })),
  );
  const [needsExpanded, setNeedsExpanded] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    needsSeed.forEach((seed, index) => {
      const startDelay = 120 + index * 220;
      let current = 0;
      const remain = Math.min(
        seed.target - 1,
        Math.floor(Math.random() * 20) + 1,
      );
      const stopAt = Math.max(0, seed.target - remain);

      const startTimer = globalThis.setTimeout(() => {
        const tick = () => {
          const step = Math.floor(Math.random() * 5) + 1;
          current = Math.min(stopAt, current + step);

          setNeeds((prev) =>
            prev.map((item) =>
              item.id === seed.id
                ? {
                    ...item,
                    current,
                    meta: `${current}/${item.target}`,
                  }
                : item,
            ),
          );

          if (current >= stopAt) {
            return;
          }

          const minDelay = Math.min(250 + index * 35, 650);
          const maxDelay = Math.min(980 - index * 25, 980);
          const nextDelay =
            Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

          const nextTimer = globalThis.setTimeout(tick, nextDelay);
          timers.push(nextTimer);
        };

        tick();
      }, startDelay);

      timers.push(startTimer);
    });

    return () => {
      timers.forEach((timer) => {
        globalThis.clearTimeout(timer);
        globalThis.clearInterval(timer);
      });
    };
  }, []);

  const filteredNeeds = useMemo(() => {
    const base = needsExpanded ? needs : needs.slice(0, 3);
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter((n) => `${n.name} ${n.meta}`.toLowerCase().includes(q));
  }, [needs, needsExpanded, search]);

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
          <div className={styles.topTitle}>บริจาคสินค้า</div>
          <div className={styles.topGhost} />
        </div>
      </header>

      <main className={styles.content}>
          <div className={styles.heroBox}>
            <img
              className={styles.heroImage}
              src={feedbackImg}
              alt="แบนเนอร์แคมเปญบริจาค"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
            <div className={styles.heroCaption}>
              พื้นที่รูป / แบนเนอร์แคมเปญบริจาค
            </div>
          </div>


          <div className={styles.sectionTitle}>
            รายการสิ่งของที่มูลนิธิต้องการ
          </div>
          <div className={styles.needsCard}>
            {filteredNeeds.map((item) => {
              const pct = Math.min(
                100,
                Math.round((item.current / item.target) * 100),
              );
              const remain = Math.max(0, item.target - item.current);
              return (
                <div className={styles.needRow} key={item.id}>
                  <div className={styles.needLeft}>
                    <div className={styles.needThumb}>
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>
                    <div className={styles.needTxt}>
                      <div className={styles.needName}>{item.name}</div>
                      <div className={styles.needMeta}>{item.meta}</div>
                      <div className={styles.needBar}>
                        <div
                          className={styles.needFill}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.needStatBox}>
                    <div className={styles.needPercent}>{pct}%</div>
                    <div className={styles.needRemain}>ขาดอีก {remain}</div>
                  </div>
                </div>
              );
            })}
            <button
              className={styles.needsMore}
              type="button"
              onClick={() => setNeedsExpanded((prev) => !prev)}
            >
              {needsExpanded ? "น้อยลง ▲" : "เพิ่มเติม ▼"}
            </button>
          </div>

          <div className={styles.infoSection}>
            <img src={feedbackImg} alt="ข้อมูลเมนู" />
          </div>
          
      </main>

      <TabBar />
    </div>
  );
}
