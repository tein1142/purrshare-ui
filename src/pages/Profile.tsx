import EditProfileModal from "../components/EditProfileModal";
import TabBar from "../components/TabBar";
import styles from "./css/Profile.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [orders] = useState<any[]>(() => {
    try {
      const pending = JSON.parse(localStorage.getItem("ps_pending") || "[]");
      return pending;
    } catch {
      return [];
    }
  });

  const [reviews] = useState([
    {
      id: 1,
      name: "สินค้า",
      star: 4,
      img: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "สินค้า",
      star: 4,
      img: "https://placecats.com/millie/300/200",
    },
    {
      id: 3,
      name: "สินค้า",
      star: 4,
      img: "https://placecats.com/poppy/300/200",
    },
  ]);

  const [showAll, setShowAll] = useState(false);

  const [profile, setProfile] = useState<any>({
    name: "ชื่อ นามสกุล",
    email: "minnie@example.com",
    phone: "09x-xxx-xxxx",
    addr: "กรุงเทพมหานคร",
    since: "2026",
  });

  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ps_profile");
      if (raw) {
        setProfile(JSON.parse(raw));
      }
    } catch {}
  }, []);

  const saveProfile = () => {
    localStorage.setItem("ps_profile", JSON.stringify(profile));
    setOpenEdit(false);
  };

  const pendingItems = orders.flatMap((order) => {
    const items = Array.isArray(order.items) ? order.items : [];

    return items.map((item: any) => ({
      ...item,
      orderId: order.id,
      orderStatus: order.status,
    }));
  });

  return (
    <div className={styles.page}>
      {/* TOP HEADER */}

      <header className={styles.top}>
        <div className={styles.topRow}>
          <button
            type="button"
            className={styles.logoBtn}
            onClick={() => navigate("/select")}
            aria-label="กลับหน้าหมวดหมู่"
          >
            <img
              className={styles.logoImg}
              src="https://img5.pic.in.th/file/secure-sv1/LOGO-0383f8dd99c535b987.png"
              alt="Purrshare"
            />
          </button>
          <div className={styles.topTitle}>โปรไฟล์</div>
        </div>

        {/* HERO CARD */}

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            {/* AVATAR + PETS */}

            <div className={styles.heroRow}>
              <div className={styles.avatarSingle}>
                <img src="https://randomuser.me/api/portraits/men/32.jpg" />
              </div>

              <div className={styles.petsCard}>
                <div className={styles.petsTitle}>
                  สัตว์เลี้ยงในครอบครัวของฉัน
                </div>

                <div className={styles.petsAvatars}>
                  <div className={styles.petA}>
                    <img src="https://placecats.com/neo/300/200" />
                  </div>

                  <div className={styles.petA}>
                    <img src="https://placecats.com/millie/300/200" />
                  </div>

                  <div className={styles.petA}>
                    <img src="https://placecats.com/poppy/300/200" />
                  </div>
                </div>

                <div className={styles.petsSub}>มีมี • จูเท้า • โกโก้</div>
              </div>
            </div>

            {/* NAME */}

            <div className={styles.name}>
              {profile.name.split("\n").map((n: string, i: number) => (
                <div key={i}>{n}</div>
              ))}
            </div>

            {/* EDIT BUTTON */}

            <button
              className={styles.editBtn}
              onClick={() => setOpenEdit(true)}
            >
              แก้ไขโปรไฟล์
            </button>

            {/* ROLE PILLS */}

            <div className={styles.rolePills}>
              <div className={`${styles.pill} ${styles.active}`}>
                สินค้ารอส่ง
              </div>

              <div className={styles.pill}>สินค้ากำลังจัดส่ง</div>
            </div>

            {/* STATS */}

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <div className={styles.statN}>12</div>
                <div className={styles.statL}>คำสั่งซื้อ</div>
              </div>

              <div className={styles.stat}>
                <div className={styles.statN}>34</div>
                <div className={styles.statL}>รายการโปรด</div>
              </div>

              <div className={styles.stat}>
                <div className={styles.statN}>8</div>
                <div className={styles.statL}>รีวิว</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.infoCard}>
        <div className={styles.infoTitle}>ข้อมูลบัญชี</div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>อีเมล</div>
            <div className={styles.infoValue}>{profile.email}</div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>เบอร์โทร</div>
            <div className={styles.infoValue}>{profile.phone}</div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>ที่อยู่</div>
            <div className={styles.infoValue}>{profile.addr}</div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>สมาชิกตั้งแต่</div>
            <div className={styles.infoValue}>{profile.since}</div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.secHead}>
          <div className={styles.secTitle}>รายการสินค้าที่รอส่ง</div>
          <div
            className={styles.secLink}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "ดูน้อยลง ▲" : "ดูทั้งหมด ›"}
          </div>
        </div>

        <div className={styles.list}>
          {(showAll ? pendingItems : pendingItems.slice(0, 3)).map((item, i) => {
            return (
              <div key={i} className={styles.row}>
                <div className={styles.left}>
                  <div className={styles.dot}>
                    <img src={item.img} />
                  </div>

                  <div className={styles.txt}>
                    <div className={styles.t1}>{item.name}</div>
                    <div className={styles.t2}>จำนวน {item.qty ?? 1} ชิ้น</div>
                  </div>
                </div>

                <div className={styles.badge}>สถานะ</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.secHead}>
          <div className={styles.secTitle}>รายการรีวิวสินค้า</div>
          <div className={styles.secLink}>ดูทั้งหมด ›</div>
        </div>

        <div className={styles.reviewCard}>
          {reviews.map((r) => {
            const stars =
              "★★★★★".slice(0, r.star) + "☆☆☆☆☆".slice(0, 5 - r.star);

            return (
              <div key={r.id} className={styles.reviewRow}>
                <div className={styles.left}>
                  <div className={styles.dot}>
                    <img src={r.img} />
                  </div>

                  <div className={styles.txt}>
                    <div className={styles.t1}>{r.name}</div>
                  </div>
                </div>

                <div className={styles.stars}>{stars}</div>
              </div>
            );
          })}
        </div>
      </section>
      <EditProfileModal
        open={openEdit}
        profile={profile}
        setProfile={setProfile}
        onClose={() => setOpenEdit(false)}
        onSave={saveProfile}
      />
      <TabBar />
    </div>
  );
}
