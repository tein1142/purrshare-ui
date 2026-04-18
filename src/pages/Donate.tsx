import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import TabBar from "../components/TabBar";
import HeaderNavMenu from "../components/HeaderNavMenu";
import ModalShell from "../components/ModalShell";
import CloseIcon from "../components/CloseButton";
import styles from "./css/Donate.module.css";
import litterImg from "../assets/images/product/donate/ทรายแมว.jpg";
import feedbackImg from "../assets/images/feedback.jpg";
import woundDressingImg from "../assets/images/product/donate/ผ้าก๊อซทำแผล.jpg";
import blanketImg from "../assets/images/product/donate/ผ้าห่ม.jpg";
import cottonImg from "../assets/images/product/donate/สำลี.jpg";
import wetFoodImg from "../assets/images/product/donate/อาหารเปียก.jpg";
import howToDonateImg from "../assets/images/howtodonate.jpg";

type NeedItem = {
  id: string;
  name: string;
  meta: string;
  img: string;
  current: number;
  target: number;
  catalogId: string;
};

type DeliveryMethod = "postal" | "self";
type SelfDeliveryForm = {
  firstName: string;
  lastName: string;
  phone: string;
  date: string;
  time: string;
};

const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

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
  const [activeNeed, setActiveNeed] = useState<NeedItem | null>(null);
  const [donateQty, setDonateQty] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("postal");
  const [uploadedNeedImages, setUploadedNeedImages] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState("");
  const [selfDeliveryModalOpen, setSelfDeliveryModalOpen] = useState(false);
  const [selfDeliveryError, setSelfDeliveryError] = useState("");
  const [selfDeliveryForm, setSelfDeliveryForm] = useState<SelfDeliveryForm>({
    firstName: "",
    lastName: "",
    phone: "",
    date: "",
    time: "",
  });
  const hasUploadedNeedImage =
    Boolean(activeNeed) && Boolean(uploadedNeedImages[activeNeed.id]);
  const remainingNeedQty = activeNeed
    ? Math.max(0, activeNeed.target - activeNeed.current)
    : 0;
  const hasRemainingNeedQty = remainingNeedQty > 0;
  const isQtyAtLimit = hasRemainingNeedQty && donateQty >= remainingNeedQty;

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

  function openNeedModal(item: NeedItem) {
    setActiveNeed(item);
    setDonateQty(Math.max(0, Math.min(1, item.target - item.current)));
    setDeliveryMethod("postal");
    setUploadError("");
    setSelfDeliveryModalOpen(false);
    setSelfDeliveryError("");
    setSelfDeliveryForm({
      firstName: "",
      lastName: "",
      phone: "",
      date: "",
      time: "",
    });
  }

  function closeNeedModal() {
    setActiveNeed(null);
    setUploadError("");
    setSelfDeliveryModalOpen(false);
    setSelfDeliveryError("");
  }

  function completeDonate() {
    if (!activeNeed) return;
    const remainingQty = Math.max(0, activeNeed.target - activeNeed.current);
    const appliedDonateQty = Math.min(donateQty, remainingQty);
    if (appliedDonateQty <= 0) return;

    setNeeds((prev) =>
      prev.map((item) => {
        if (item.id !== activeNeed.id) return item;
        const nextCurrent = Math.min(item.target, item.current + appliedDonateQty);
        return {
          ...item,
          current: nextCurrent,
          meta: `${nextCurrent}/${item.target}`,
        };
      }),
    );

    setSelfDeliveryModalOpen(false);
    setSelfDeliveryError("");
    closeNeedModal();
  }

  function submitDonate() {
    if (!activeNeed) return;
    if (!hasRemainingNeedQty || donateQty <= 0) return;

    if (deliveryMethod === "self") {
      setSelfDeliveryError("");
      setSelfDeliveryModalOpen(true);
      return;
    }

    completeDonate();
  }

  function confirmSelfDeliveryDonate() {
    const trimmedFirstName = selfDeliveryForm.firstName.trim();
    const trimmedLastName = selfDeliveryForm.lastName.trim();
    const trimmedPhone = selfDeliveryForm.phone.trim();

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedPhone ||
      !selfDeliveryForm.date ||
      !selfDeliveryForm.time
    ) {
      setSelfDeliveryError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setSelfDeliveryError("กรุณากรอกเบอร์โทรให้ครบ 10 หลัก");
      return;
    }

    completeDonate();
  }

  function updateSelfDeliveryField<K extends keyof SelfDeliveryForm>(
    field: K,
    value: SelfDeliveryForm[K],
  ) {
    setSelfDeliveryForm((prev) => ({ ...prev, [field]: value }));
    if (selfDeliveryError) {
      setSelfDeliveryError("");
    }
  }

  function onNeedImageUpload(event: ChangeEvent<HTMLInputElement>) {
    if (!activeNeed) return;

    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("อัปโหลดได้เฉพาะไฟล์รูปเท่านั้น");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setUploadError("ไฟล์รูปต้องมีขนาดไม่เกิน 5 MB");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setUploadedNeedImages((prev) => ({
          ...prev,
          [activeNeed.id]: result,
        }));
        setUploadError("");
      }
    };
    reader.readAsDataURL(file);

    // Allow picking the same file again in the next selection.
    event.target.value = "";
  }

  function removeUploadedNeedImage() {
    if (!activeNeed) return;

    setUploadedNeedImages((prev) => {
      const next = { ...prev };
      delete next[activeNeed.id];
      return next;
    });
    setUploadError("");
  }

  return (
    <div className={styles.app}>
      <header className={styles.top}>
        <div className={styles.topRow}>
          <HeaderNavMenu />
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
                <button
                  type="button"
                  className={`${styles.needRow} ${styles.needRowButton}`}
                  key={item.id}
                  onClick={() => openNeedModal(item)}
                >
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
                </button>
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
            <img src={howToDonateImg} alt="ข้อมูลเมนู" />
          </div>
          
      </main>

      <ModalShell
        open={Boolean(activeNeed)}
        onClose={closeNeedModal}
        panelClassName={styles.needModalPanel}
      >
        {activeNeed && (
          <div className={styles.needModalBody}>
            <div className={styles.needModalHead}>
              <div className={styles.needModalHeadGhost} />
              <div className={styles.needModalTitle}>{activeNeed.name}</div>
              <CloseIcon onClose={closeNeedModal} />
            </div>

            <div className={styles.needModalImageWrap}>
              <img
                className={styles.needModalImage}
                src={uploadedNeedImages[activeNeed.id] || activeNeed.img}
                alt={activeNeed.name}
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </div>

            <div className={styles.needModalStatsRow}>
              <span>{activeNeed.current}/{activeNeed.target}</span>
              <span>
                {Math.min(100, Math.round((activeNeed.current / activeNeed.target) * 100))}%
              </span>
            </div>
            <div className={styles.needModalProgress}>
              <div
                className={styles.needModalProgressFill}
                style={{
                  width: `${Math.min(100, Math.round((activeNeed.current / activeNeed.target) * 100))}%`,
                }}
              />
            </div>

            {hasUploadedNeedImage ? (
              <button
                type="button"
                className={`${styles.needModalHint} ${styles.needModalHintRemove}`}
                onClick={removeUploadedNeedImage}
              >
                ลบรูปที่อัปโหลด
              </button>
            ) : (
              <label htmlFor="need-image-upload" className={styles.needModalHint}>
                แตะเพื่อเพิ่มรูป
              </label>
            )}
            <input
              id="need-image-upload"
              type="file"
              accept="image/*"
              className={styles.needModalFileInput}
              onChange={onNeedImageUpload}
            />
            {uploadError && (
              <div className={styles.needModalUploadError}>{uploadError}</div>
            )}

            <div className={styles.needModalTypeRow}>
              <label
                className={`${styles.needModalTypeOption} ${deliveryMethod === "postal" ? styles.needModalTypeOptionActive : ""}`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="postal"
                  checked={deliveryMethod === "postal"}
                  onChange={() => setDeliveryMethod("postal")}
                />
                <span>ไปรษณีย์</span>
              </label>

              <label
                className={`${styles.needModalTypeOption} ${deliveryMethod === "self" ? styles.needModalTypeOptionActive : ""}`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="self"
                  checked={deliveryMethod === "self"}
                  onChange={() => setDeliveryMethod("self")}
                />
                <span>ส่งเอง</span>
              </label>
            </div>

            <div className={styles.needModalActions}>
              <div className={styles.needModalQtyWrap}>
                <button
                  type="button"
                  className={styles.needModalQtyBtn}
                  onClick={() => setDonateQty((prev) => Math.max(0, prev - 1))}
                  disabled={!hasRemainingNeedQty || donateQty <= 0}
                >
                  -
                </button>
                <span className={styles.needModalQtyVal}>{donateQty}</span>
                <button
                  type="button"
                  className={styles.needModalQtyBtn}
                  onClick={() =>
                    setDonateQty((prev) => Math.min(remainingNeedQty, prev + 1))
                  }
                  disabled={!hasRemainingNeedQty || donateQty >= remainingNeedQty}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`${styles.primaryBtn} ${styles.needModalDonateBtn}`}
                onClick={submitDonate}
                disabled={!hasRemainingNeedQty || donateQty <= 0}
              >
                บริจาค
              </button>
            </div>
            {(!hasRemainingNeedQty || isQtyAtLimit) && (
              <div className={styles.needModalLimitNotice}>
                {!hasRemainingNeedQty
                  ? "รายการนี้ครบลิมิตแล้ว"
                  : "เพิ่มได้สูงสุดตามลิมิตที่ต้องการแล้ว"}
              </div>
            )}
          </div>
        )}
      </ModalShell>

      <ModalShell
        open={selfDeliveryModalOpen}
        onClose={() => {
          setSelfDeliveryModalOpen(false);
          setSelfDeliveryError("");
        }}
        panelClassName={styles.selfDeliveryPanel}
      >
        <div className={styles.selfDeliveryBody}>
          <div className={styles.selfDeliveryHead}>
            <div className={styles.selfDeliveryTitle}>ข้อมูลการนำส่งเอง</div>
            <CloseIcon
              onClose={() => {
                setSelfDeliveryModalOpen(false);
                setSelfDeliveryError("");
              }}
            />
          </div>

          <div className={styles.selfDeliveryGrid}>
            <label className={styles.selfDeliveryField}>
              <span>ชื่อ</span>
              <input
                type="text"
                value={selfDeliveryForm.firstName}
                onChange={(e) => updateSelfDeliveryField("firstName", e.target.value)}
                placeholder="กรอกชื่อ"
              />
            </label>

            <label className={styles.selfDeliveryField}>
              <span>นามสกุล</span>
              <input
                type="text"
                value={selfDeliveryForm.lastName}
                onChange={(e) => updateSelfDeliveryField("lastName", e.target.value)}
                placeholder="กรอกนามสกุล"
              />
            </label>

            <label className={styles.selfDeliveryField}>
              <span>เบอร์โทร</span>
              <input
                type="tel"
                inputMode="numeric"
                value={selfDeliveryForm.phone}
                onChange={(e) =>
                  updateSelfDeliveryField(
                    "phone",
                    e.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                maxLength={10}
                placeholder="08xxxxxxxx"
              />
            </label>

            <div className={styles.selfDeliveryDateTimeRow}>
              <label className={styles.selfDeliveryField}>
                <span>วันที่</span>
                <input
                  type="date"
                  value={selfDeliveryForm.date}
                  onChange={(e) => updateSelfDeliveryField("date", e.target.value)}
                />
              </label>

              <label className={styles.selfDeliveryField}>
                <span>เวลา</span>
                <input
                  type="time"
                  value={selfDeliveryForm.time}
                  onChange={(e) => updateSelfDeliveryField("time", e.target.value)}
                />
              </label>
            </div>
          </div>

          {selfDeliveryError && (
            <div className={styles.selfDeliveryError}>{selfDeliveryError}</div>
          )}

          <div className={styles.selfDeliveryActions}>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => {
                setSelfDeliveryModalOpen(false);
                setSelfDeliveryError("");
              }}
            >
              ย้อนกลับ
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={confirmSelfDeliveryDonate}
            >
              ยืนยันบริจาค
            </button>
          </div>
        </div>
      </ModalShell>

      <TabBar />
    </div>
  );
}
