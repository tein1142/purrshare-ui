import EditProfileModal from "../components/EditProfileModal";
import TabBar from "../components/TabBar";
// Import local images for reviews
import foodDryImg from "../assets/images/product/food/อาหารเม็ดแมว1.2kg.png";
import catBedImg from "../assets/images/product/furniture/ที่นอนแมว.jpg";
import catnipToyImg from "../assets/images/product/toys/ของเล่นตุ๊กตายัดไส้กัญชาแมว.jpg";
import styles from "./css/Profile.module.css";
import profileImg from "../assets/images/minnie-profile.jpg"
import { useState, useEffect } from "react";

interface Order {
  id: string;
  status: "pending" | "shipping" | "delivered";
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  img: string;
  qty?: number;
  price?: number;
  desc?: string;
}

interface Profile {
  name: string;
  email: string;
  phone: string;
  addr: string;
  since: string;
}

export default function Profile() {
  const [orders, setOrders] = useState<Order[]>(() => {
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
      name: "ไม้ตกแมว: ของใหม่มาก สะอาดสุดๆ ขอบคุณมากนะคะ",
      star: 4,
      img: foodDryImg,
    },
    {
      id: 2,
      name: "คอนโดแมว: คอนโดแมวมือสองที่สะอาดมากคุณเจ้าของดูแลดีมากค่ะ",
      star: 4,
      img: catBedImg,
    },
    {
      id: 3,
      name: "น้ำพุแมว: ตอนแรกเล็งไว้นาน เจอมือสองเลยรีบซื้อมาลองเลย",
      star: 4,
      img: catnipToyImg,
    },
  ]);

  const [showAll, setShowAll] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    name: "ชื่อ นามสกุล",
    email: "minnie@example.com",
    phone: "09x-xxx-xxxx",
    addr: "กรุงเทพมหานคร",
    since: "2026",
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTab, setSelectedTab] = useState("pending");

  useEffect(() => {
    const loadProfile = () => {
      try {
        const raw = localStorage.getItem("ps_profile");
        if (raw) {
          setProfile(JSON.parse(raw));
        }
      } catch {
        // Handle error silently
      }
    };
    
    loadProfile();
  }, []);

  // Update order status after 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          const orderAge = Date.now() - Number(order.id);
          const oneMinute = 60 * 1000;
          
          if (order.status === "pending" && orderAge >= oneMinute) {
            const updatedOrder: Order = { ...order, status: "shipping" };
            
            // Update localStorage
            try {
              const allOrders = JSON.parse(localStorage.getItem("ps_pending") || "[]");
              const orderIndex = allOrders.findIndex((o: Order) => o.id === order.id);
              if (orderIndex !== -1) {
                allOrders[orderIndex] = updatedOrder;
                localStorage.setItem("ps_pending", JSON.stringify(allOrders));
              }
            } catch (error) {
              console.error("Error updating order status:", error);
            }
            
            return updatedOrder;
          }
          
          return order;
        });
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const saveProfile = (updated: Profile) => {
    localStorage.setItem("ps_profile", JSON.stringify(updated));
    setOpenEdit(false);
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "สินค้ารอส่ง";
      case "shipping":
        return "สินค้ากำลังจัดส่ง";
      case "delivered":
        return "จัดส่งแล้ว";
      default:
        return "สถานะ";
    }
  };

  const pendingItems = orders.flatMap((order) => {
    const items = Array.isArray(order.items) ? order.items : [];

    return items.map((item: OrderItem) => ({
      ...item,
      orderId: order.id,
      orderStatus: order.status,
    }));
  });

  // Filter items based on selected tab
  const filteredItems = pendingItems.filter(item => {
    if (selectedTab === "pending") {
      return item.orderStatus === "pending";
    } else if (selectedTab === "shipping") {
      return item.orderStatus === "shipping";
    }
    return false;
  });

  return (
    <div className={styles.page}>
      {/* TOP HEADER */}

      <header className={styles.top}>
        <div className={styles.topRow}>
          {/* <button
            type="button"
            className={styles.logoBtn}
            onClick={() => navigate("/select")}
            aria-label="กลับหน้าหมวดหมู่"
          >
            <img
              className={styles.logoImg}
              src={logo02}
              alt="Purrshare"
            />
          </button> */}
          <div className={styles.topTitle}>โปรไฟล์</div>
        </div>

        {/* HERO CARD */}

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            {/* AVATAR */}

            <div className={styles.heroRow}>
              <div className={styles.avatarSingle}>
                <img src={profileImg} alt="รูปโปรไฟล์" />
              </div>
            </div>

            {/* NAME */}

            <div className={styles.name}>
              {profile.name.split("\n").map((n: string) => (
                <div key={n}>{n}</div>
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
{/* 
            <div className={styles.rolePills}>
              <div className={`${styles.pill} ${styles.active}`}>
                สินค้ารอส่ง
              </div>

              <div className={styles.pill}>สินค้ากำลังจัดส่ง</div>
            </div> */}

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

      <section className={styles.section} data-section="pending-items">
        <div className={styles.secHead}>
          <div className={styles.tabButtons}>
            <button
              type="button"
              className={`${styles.tabBtn} ${selectedTab === "pending" ? styles.active : ""}`}
              onClick={() => setSelectedTab("pending")}
            >
              สินค้ารอส่ง
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${selectedTab === "shipping" ? styles.active : ""}`}
              onClick={() => setSelectedTab("shipping")}
            >
              สินค้ากำลังจัดส่ง
            </button>
          </div>
          <div className={styles.actionRow}>
            <div className={styles.secTitle}>รายการสินค้า</div>
            <button
              type="button"
              className={styles.secLink}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "ดูน้อยลง ▲" : "ดูทั้งหมด ›"}
            </button>
          </div>
        </div>

        <div className={styles.list}>
          {(showAll ? filteredItems : filteredItems.slice(0, 3)).map((item, i) => {
            return (
              <div key={`${item.orderId}-${i}`} className={styles.row}>
                <div className={styles.left}>
                  <div className={styles.dot}>
                    <img src={item.img} alt={item.name} />
                  </div>

                  <div className={styles.txt}>
                    <div className={styles.t1}>{item.name}</div>
                    <div className={styles.t2}>จำนวน {item.qty ?? 1} ชิ้น</div>
                  </div>
                </div>

                <div className={styles.badge}>
                  {getOrderStatusText(item.orderStatus)}
                </div>
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
                    <img src={r.img} alt={r.name} />
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
