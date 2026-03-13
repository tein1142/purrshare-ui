import { useState } from "react";
import TabBar from "../components/TabBar";
import styles from "./css/Donate.module.css";

type Plan = {
  id: string;
  title: string;
  amount: number;
  desc: string;
  img: string;
};

const plans: Plan[] = [
  {
    id: "food",
    title: "มื้ออาหารแมวจร",
    amount: 99,
    desc: "สนับสนุนค่าอาหาร 1 สัปดาห์",
    img: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42",
  },
  {
    id: "med",
    title: "กองทุนรักษาพยาบาล",
    amount: 199,
    desc: "ช่วยค่าเวชภัณฑ์และการตรวจสุขภาพ",
    img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4",
  },
  {
    id: "shelter",
    title: "สนับสนุนศูนย์พักพิง",
    amount: 299,
    desc: "ช่วยดูแลที่พักและอุปกรณ์จำเป็น",
    img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
  },
];

export default function Donate() {
  const [message, setMessage] = useState("");

  function onDonate(plan: Plan) {
    const data = {
      id: Date.now(),
      title: plan.title,
      amount: plan.amount,
      createdAt: new Date().toISOString(),
    };

    const raw = localStorage.getItem("ps_donations") || "[]";
    const history = JSON.parse(raw);
    history.unshift(data);

    localStorage.setItem("ps_donations", JSON.stringify(history));
    setMessage(`ขอบคุณสำหรับการสนับสนุน ${plan.amount} THB`);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.title}>บริจาคเพื่อแมวที่ต้องการความช่วยเหลือ</div>
        <div className={styles.subTitle}>โหมดเดโม: บันทึกประวัติไว้ในเครื่องเท่านั้น</div>
      </header>

      <main className={styles.content}>
        {plans.map((plan) => (
          <article key={plan.id} className={styles.card}>
            <img className={styles.image} src={plan.img} alt={plan.title} />

            <div className={styles.body}>
              <div className={styles.cardTitle}>{plan.title}</div>
              <div className={styles.desc}>{plan.desc}</div>
              <div className={styles.amount}>{plan.amount} THB</div>

              <button
                className={styles.donateBtn}
                type="button"
                onClick={() => onDonate(plan)}
              >
                สนับสนุนโครงการนี้
              </button>
            </div>
          </article>
        ))}

        {message && <div className={styles.message}>{message}</div>}
      </main>

      <TabBar />
    </div>
  );
}
