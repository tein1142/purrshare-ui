import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../components/CloseButton";
import ModalShell from "../components/ModalShell";
import TabBar from "../components/TabBar";
import styles from "./css/Donate.module.css";

type CatalogItem = {
  id: string;
  name: string;
  meta: string;
  img: string;
};

type NeedItem = {
  id: string;
  name: string;
  meta: string;
  img: string;
  current: number;
  target: number;
  catalogId: string;
};

type DonateItem = {
  id: string;
  name: string;
  meta: string;
  img: string;
  qty: number;
};

type SampleItem = {
  id: string;
  name: string;
  desc: string;
  donor: string;
  loc: string;
  tag: string;
  img: string;
};

const catalog: CatalogItem[] = [
  {
    id: "food",
    name: "อาหารแมว",
    meta: "สำหรับน้องเหมียว",
    img: "/external/unsplash_1548681528-6a5c45b66b42.jpg?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "litter",
    name: "ทรายแมว",
    meta: "สะอาด กลิ่นน้อย",
    img: "/external/unsplash_1518791841217-8f162f1e1131.jpg?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "toy",
    name: "ของเล่นแมว",
    meta: "สนุกเพลินทั้งวัน",
    img: "/external/unsplash_1545249390-6bdfa286032f.jpg?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "bed",
    name: "ที่นอนแมว",
    meta: "นุ่มสบาย",
    img: "/external/unsplash_1573865526739-10659fec78a5.jpg",
  },
];

const needsSeed: NeedItem[] = [
  {
    id: "pads",
    name: "สำลีแผ่น",
    meta: "34 / 200 ชิ้น",
    img: "/external/unsplash_1583947582886-f40ec95dd752.jpg?auto=format&fit=crop&w=800&q=70",
    current: 34,
    target: 200,
    catalogId: "toy",
  },
  {
    id: "wetfood",
    name: "อาหารเปียก",
    meta: "67 / 100 ชิ้น",
    img: "/external/unsplash_1548681528-6a5c45b66b42.jpg?auto=format&fit=crop&w=800&q=70",
    current: 67,
    target: 100,
    catalogId: "food",
  },
  {
    id: "wound",
    name: "ผ้าก๊อตทำแผล",
    meta: "23 / 50 ชิ้น",
    img: "/external/unsplash_1584515933487-779824d29309.jpg?auto=format&fit=crop&w=800&q=70",
    current: 23,
    target: 50,
    catalogId: "toy",
  },
  {
    id: "litter-need",
    name: "ทรายแมว",
    meta: "12 / 80 ชิ้น",
    img: "/external/unsplash_1518791841217-8f162f1e1131.jpg?auto=format&fit=crop&w=800&q=70",
    current: 12,
    target: 80,
    catalogId: "litter",
  },
  {
    id: "blanket",
    name: "ผ้าห่ม/ผ้าขนหนู",
    meta: "9 / 60 ชิ้น",
    img: "/external/unsplash_1573865526739-10659fec78a5.jpg",
    current: 9,
    target: 60,
    catalogId: "bed",
  },
];

const sampleItems: SampleItem[] = [
  {
    id: "s1",
    name: "อาหารแมวสูตรปลาทูน่า 1kg",
    desc: "ยังไม่เปิดซอง เหมาะสำหรับน้องแมวโต",
    donor: "May",
    loc: "ลาดพร้าว, กทม.",
    tag: "อาหาร",
    img: "/external/unsplash_1548681528-6a5c45b66b42.jpg?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "s2",
    name: "ทรายแมวเบนโทไนท์ 5L",
    desc: "เหลือจากการย้ายบ้าน สภาพดี",
    donor: "Nina",
    loc: "บางนา, กทม.",
    tag: "ทราย",
    img: "/external/unsplash_1518791841217-8f162f1e1131.jpg?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "s3",
    name: "ที่นอนแมวทรงโดนัท",
    desc: "นุ่มมาก ซักแล้ว พร้อมส่งต่อ",
    donor: "Beam",
    loc: "นนทบุรี",
    tag: "ที่นอน",
    img: "/external/unsplash_1573865526739-10659fec78a5.jpg",
  },
  {
    id: "s4",
    name: "ของเล่นไม้ตกแมว (ใหม่)",
    desc: "ซื้อซ้ำมาเกิน แกะแล้วแต่ยังไม่ใช้",
    donor: "Minnie",
    loc: "พระราม 9, กทม.",
    tag: "ของเล่น",
    img: "/external/unsplash_1545249390-6bdfa286032f.jpg?auto=format&fit=crop&w=800&q=70",
  },
];

export default function Donate() {
  const navigate = useNavigate();
  const fallbackImage = "/external/unsplash_1543852786-1cf6624b9987.jpg?auto=format&fit=crop&w=800&q=70";
  const [search, setSearch] = useState("");
  const [needs] = useState<NeedItem[]>(needsSeed);
  const [needsExpanded, setNeedsExpanded] = useState(false);
  const [list, setList] = useState<DonateItem[]>(() => {
    try {
      const raw = localStorage.getItem("ps_donate_items") || "[]";
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as DonateItem[]) : [];
    } catch {
      return [];
    }
  });

  const [addOpen, setAddOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [pickIndex, setPickIndex] = useState(0);
  const [pickQty, setPickQty] = useState(1);
  const [selectedSample, setSelectedSample] = useState<SampleItem | null>(null);

  const [senderName, setSenderName] = useState("Minnie");
  const [senderPhone, setSenderPhone] = useState("09x-xxx-xxxx");
  const [senderType, setSenderType] = useState("บริจาค");
  const [senderAddr, setSenderAddr] = useState("กรุงเทพฯ");
  const [senderNote, setSenderNote] = useState("ฝากน้องเหมียวด้วยนะ");

  const activePick = catalog[pickIndex % catalog.length];

  const filteredNeeds = useMemo(() => {
    const base = needsExpanded ? needs : needs.slice(0, 3);
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter((n) => `${n.name} ${n.meta}`.toLowerCase().includes(q));
  }, [needs, needsExpanded, search]);

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((n) => `${n.name} ${n.meta}`.toLowerCase().includes(q));
  }, [list, search]);

  const filteredSamples = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sampleItems;
    return sampleItems.filter((s) => `${s.name} ${s.desc} ${s.tag}`.toLowerCase().includes(q));
  }, [search]);

  const totalQty = list.reduce((sum, item) => sum + item.qty, 0);

  function persistDonateItems(next: DonateItem[]) {
    setList(next);
    localStorage.setItem("ps_donate_items", JSON.stringify(next));
  }

  function increaseListQty(id: string) {
    const next = list.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    persistDonateItems(next);
  }

  function decreaseListQty(id: string) {
    const next = list
      .map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty - 1) } : item
      )
      .filter((item) => item.qty > 0);
    persistDonateItems(next);
  }

  function openAddModal() {
    setPickIndex((prev) => (prev + 1) % catalog.length);
    setPickQty(1);
    setAddOpen(true);
  }

  function addPickedItemToList() {
    const existing = list.find((item) => item.id === activePick.id);
    const next = existing
      ? list.map((item) =>
          item.id === activePick.id
            ? { ...item, qty: item.qty + pickQty }
            : item
        )
      : [
          ...list,
          {
            id: activePick.id,
            name: activePick.name,
            meta: activePick.meta,
            img: activePick.img,
            qty: pickQty,
          },
        ];

    setAddOpen(false);
    setLoading(true);
    globalThis.setTimeout(() => {
      persistDonateItems(next);
      setLoading(false);
    }, 260);
  }

  function addNeedToList(need: NeedItem) {
    const existing = list.find((item) => item.id === need.catalogId);
    const fromCatalog = catalog.find((c) => c.id === need.catalogId) ?? catalog[0];
    const next = existing
      ? list.map((item) =>
          item.id === need.catalogId ? { ...item, qty: item.qty + 1 } : item
        )
      : [
          ...list,
          {
            id: fromCatalog.id,
            name: fromCatalog.name,
            meta: fromCatalog.meta,
            img: fromCatalog.img,
            qty: 1,
          },
        ];

    setLoading(true);
    globalThis.setTimeout(() => {
      persistDonateItems(next);
      setLoading(false);
    }, 260);
  }

  function submitDonationFlow() {
    if (!list.length) {
      setFormOpen(false);
      return;
    }

    setFormOpen(false);
    setLoading(true);

    globalThis.setTimeout(() => {
      const raw = localStorage.getItem("ps_donations") || "[]";
      const history = JSON.parse(raw);
      history.unshift({
        id: Date.now(),
        senderName,
        senderPhone,
        senderType,
        senderAddr,
        senderNote,
        items: list,
      });
      localStorage.setItem("ps_donations", JSON.stringify(history));

      persistDonateItems([]);
      setLoading(false);
      setSuccess(true);
    }, 700);
  }

  return (
    <div className={styles.app}>
      <header className={styles.psHeader}>
        <div className={styles.psHeaderRow}>
          <button className={styles.psLogoBtn} type="button" onClick={() => navigate("/")} aria-label="Home">
            <svg className={styles.psLogoSvg} viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 14c7 0 12 5 12 12 0 9-6 16-12 16s-12-7-12-16c0-7 5-12 12-12Z" fill="none" stroke="rgba(17,24,39,.85)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22c-3-2-5-5-5-8 0-2 1-4 3-4 3 0 5 3 6 6" fill="none" stroke="rgba(17,24,39,.85)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M44 22c3-2 5-5 5-8 0-2-1-4-3-4-3 0-5 3-6 6" fill="none" stroke="rgba(17,24,39,.85)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 46c4 4 9 6 14 6s10-2 14-6" fill="none" stroke="rgba(17,24,39,.85)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={styles.psSearch}>
            <input
              id="psSearchInput"
              type="search"
              placeholder="ค้นหา..."
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className={styles.psSearchIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm8 3-4.2-4.2" />
            </svg>
          </div>
        </div>
      </header>

      {!success && (
        <main className={styles.content}>
          <div className={styles.heroBox}>
            <img
              className={styles.heroImage}
              src="/external/unsplash_1518791841217-8f162f1e1131.jpg?auto=format&fit=crop&w=1200&q=70"
              alt="แบนเนอร์แคมเปญบริจาค"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
            <div className={styles.heroCaption}>พื้นที่รูป / แบนเนอร์แคมเปญบริจาค</div>
          </div>

          <div className={styles.flowGuide}>
            <div className={styles.flowChip}>1. เพิ่มรายการ</div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowChip}>2. ตรวจจำนวน</div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowChipActive}>3. ยืนยันบริจาค</div>
          </div>

          <div className={styles.sectionTitle}>รายการสิ่งของที่มูลนิธิต้องการ</div>
          <div className={styles.needsCard}>
            {filteredNeeds.map((item) => {
              const pct = Math.min(100, Math.round((item.current / item.target) * 100));
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
                        <div className={styles.needFill} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.needBtn}
                    onClick={() => addNeedToList(item)}
                  >
                    เพิ่มเข้าลิสต์
                  </button>
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

          <div className={styles.sectionTitle}>รายการบริจาคของคุณ</div>
          <div className={styles.listCard}>
            {filteredList.length === 0 ? (
              <div className={styles.emptyWrap}>
                <div className={styles.empty}>เพิ่มรายการจากสิ่งของที่มูลนิธิต้องการด้านบน</div>
                <button className={styles.openAddBtn} type="button" onClick={openAddModal}>
                  เลือกจากแคตตาล็อก
                </button>
              </div>
            ) : (
              filteredList.map((item) => (
                <div className={styles.itemRow} key={item.id}>
                  <div className={styles.itemLeft}>
                    <div className={styles.thumb}>
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>
                    <div className={styles.itemTxt}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemMeta}>{item.meta}</div>
                    </div>
                  </div>

                  <div className={styles.qtyPill}>
                    <button type="button" className={styles.qtyBtn} onClick={() => decreaseListQty(item.id)}>−</button>
                    <div className={styles.qtyVal}>{item.qty}</div>
                    <button type="button" className={styles.qtyBtn} onClick={() => increaseListQty(item.id)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.sectionTitle}>ตัวอย่างสินค้าที่มีคนบริจาคแล้ว</div>
          <div className={styles.sampleGrid}>
            {filteredSamples.map((item) => (
              <button
                key={item.id}
                className={styles.sampleCard}
                type="button"
                onClick={() => {
                  setSelectedSample(item);
                  setDetailOpen(true);
                }}
              >
                <div className={styles.sampleImg}>
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>
                <div className={styles.sampleBody}>
                  <div className={styles.sampleName}>{item.name}</div>
                  <div className={styles.sampleMeta}>{item.loc}</div>
                  <div className={styles.sampleTagRow}>
                    <div className={styles.sampleTag}>{item.tag}</div>
                    <svg className={styles.sampleArrow} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </main>
      )}

      {success && (
        <div className={styles.successWrap}>
          <div className={styles.successCard}>
            <div className={styles.meowBox}>
              <img
                className={styles.meowIcon}
                src="/external/unsplash_1574158622682-e40e69881006.jpg?auto=format&fit=crop&w=300&q=70"
                alt="แมวขอบคุณสำหรับการบริจาค"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </div>
            <p className={styles.meow}>Meow</p>
            <div className={styles.meowSub}>ขอบคุณที่ช่วยน้องเหมียว 💛</div>
            <button className={styles.primaryBtn} type="button" onClick={() => navigate("/")}>
              กลับหน้าแรก
            </button>
          </div>
        </div>
      )}

      {!success && (
        <div className={styles.bottomBar}>
          <div className={styles.bottomBarInner}>
            <div className={styles.summary}>
              <div className={styles.sumTitle}>พร้อมบริจาคแล้ว</div>
              <div className={styles.sumSub}>
                {totalQty > 0 ? `รวม ${totalQty} ชิ้น • กดบริจาคเพื่อกรอกข้อมูล` : "เพิ่มรายการอย่างน้อย 1 ชิ้น"}
              </div>
            </div>
            <button
              className={`${styles.primaryBtn} ${styles.donateBtn}`}
              type="button"
              disabled={!list.length}
              onClick={() => setFormOpen(true)}
            >
              บริจาค
            </button>
          </div>
        </div>
      )}

      <ModalShell open={addOpen} onClose={() => setAddOpen(false)} panelClassName={styles.sheet}>
        <div className={styles.sheetHead}>
          <div className={styles.sheetTitle}>เพิ่มรายการบริจาค</div>
          <CloseIcon onClose={() => setAddOpen(false)} />
        </div>
        <div className={styles.sheetBody}>
          <div className={styles.itemRowNoMargin}>
            <div className={styles.itemLeft}>
              <div className={styles.thumb}>
                <img
                  src={activePick.img}
                  alt={activePick.name}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              </div>
              <div className={styles.itemTxt}>
                <div className={styles.itemName}>{activePick.name}</div>
                <div className={styles.itemMeta}>{activePick.meta}</div>
              </div>
            </div>
            <div className={styles.qtyPill}>
              <button type="button" className={styles.qtyBtn} onClick={() => setPickQty((n) => Math.max(1, n - 1))}>−</button>
              <div className={styles.qtyVal}>{pickQty}</div>
              <button type="button" className={styles.qtyBtn} onClick={() => setPickQty((n) => Math.min(99, n + 1))}>+</button>
            </div>
          </div>
          <button className={styles.primaryBtnFull} type="button" onClick={addPickedItemToList}>
            เพิ่มเข้าลิสต์
          </button>
        </div>
      </ModalShell>

      <ModalShell open={formOpen} onClose={() => setFormOpen(false)} panelClassName={styles.sheet}>
        <div className={styles.sheetHead}>
          <div className={styles.sheetTitle}>รายละเอียดการรับบริจาค</div>
          <CloseIcon onClose={() => setFormOpen(false)} />
        </div>
        <div className={styles.sheetBody}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fName">ชื่อผู้ส่ง</label>
            <input id="fName" className={styles.input} value={senderName} onChange={(e) => setSenderName(e.target.value)} />
          </div>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="fPhone">เบอร์</label>
              <input id="fPhone" className={styles.input} value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="fType">ประเภท</label>
              <input id="fType" className={styles.input} value={senderType} onChange={(e) => setSenderType(e.target.value)} />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fAddr">ที่อยู่</label>
            <input id="fAddr" className={styles.input} value={senderAddr} onChange={(e) => setSenderAddr(e.target.value)} />
          </div>
          <div className={styles.fieldNoMargin}>
            <label className={styles.label} htmlFor="fNote">หมายเหตุ</label>
            <input id="fNote" className={styles.input} value={senderNote} onChange={(e) => setSenderNote(e.target.value)} />
          </div>
        </div>
        <div className={styles.sheetActions}>
          <button className={styles.ghostBtn} type="button" onClick={() => setFormOpen(false)}>ยกเลิก</button>
          <button className={styles.primaryBtn} type="button" onClick={submitDonationFlow}>ยืนยัน</button>
        </div>
      </ModalShell>

      <ModalShell open={detailOpen} onClose={() => setDetailOpen(false)} panelClassName={styles.sheet}>
        <div className={styles.sheetHead}>
          <div className={styles.sheetTitle}>รายละเอียดสินค้า</div>
          <CloseIcon onClose={() => setDetailOpen(false)} />
        </div>
        <div className={styles.sheetBody}>
          {selectedSample && (
            <>
              <div className={styles.detailTopRow}>
                <div className={styles.detailThumb}>
                  <img
                    src={selectedSample.img}
                    alt={selectedSample.name}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>
                <div className={styles.detailMetaWrap}>
                  <div className={styles.itemNameMulti}>{selectedSample.name}</div>
                  <div className={styles.itemMetaMulti}>{selectedSample.desc}</div>
                  <div className={styles.detailTags}>
                    <div className={styles.sampleTag}>สภาพดี</div>
                    <div className={styles.sampleTag}>พร้อมส่งต่อ</div>
                  </div>
                </div>
              </div>

              <div className={styles.detailInfoBlock}>
                <div className={styles.label}>ผู้บริจาค</div>
                <div className={styles.detailStrong}>{selectedSample.donor}</div>
              </div>

              <div className={styles.detailInfoBlock}>
                <div className={styles.label}>พื้นที่รับของ</div>
                <div className={styles.detailMuted}>{selectedSample.loc}</div>
              </div>

              <button className={styles.primaryBtnFull} type="button" onClick={() => setDetailOpen(false)}>
                ปิด
              </button>
            </>
          )}
        </div>
      </ModalShell>

      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingCard}>
            <div className={styles.spinner} />
            <div className={styles.loadingText}>กำลังโหลด...</div>
          </div>
        </div>
      )}

      <TabBar />
    </div>
  );
}
