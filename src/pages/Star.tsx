import styles from "./css/Star.module.css";
import Tabbar from "../components/TabBar";

export default function Star() {
  return (
    <div className={styles.page}>
      {/* HEADER */}

      <header className={styles.top}>
        <div className={styles.topTitle}>อันดับและคุณภาพผู้ขาย</div>
      </header>

      {/* CONTENT */}

      <div className={styles.content}>
        <div className={styles.h1}>ผู้ขายยอดนิยม 3 อันดับประจำเดือน</div>

        {/* TOP SELLER */}

        <div className={styles.card}>
          <div className={styles.cardPad}>
            <div className={styles.subHead}>Top 1</div>

            <div className={styles.top3}>
              <div className={`${styles.podium} ${styles.rank2}`}>
                <div className={styles.starBadge}>★</div>

                <div className={styles.ava}>
                  <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300" />
                </div>

                <div className={styles.pName}>Mimi Shop</div>
                <div className={styles.pScore}>ยอดขาย 18,200</div>
              </div>

              <div className={`${styles.podium} ${styles.rank1}`}>
                <div className={styles.starBadge}>★</div>

                <div className={styles.ava}>
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300" />
                </div>

                <div className={styles.pName}>Purr Premium</div>
                <div className={styles.pScore}>ยอดขาย 25,900</div>
              </div>

              <div className={`${styles.podium} ${styles.rank3}`}>
                <div className={styles.starBadge}>★</div>

                <div className={styles.ava}>
                  <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300" />
                </div>

                <div className={styles.pName}>Catty Corner</div>
                <div className={styles.pScore}>ยอดขาย 14,650</div>
              </div>
            </div>

            {/* FEATURE PRODUCT */}

            {/* <div className={styles.feature}>
              <div className={styles.featImg}>
                <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600" />
              </div>

              <div className={styles.featTxt}>
                <div className={styles.featTitle}>Name 000111</div>

                <div className={styles.featSub}>Lorem ipsum dolor sit amet</div>

                <div className={styles.featPrice}>200 THB</div>
              </div>
            </div> */}
          </div>
        </div>

        {/* REVIEW */}

        <div className={styles.sec}>
          <div className={styles.secHead}>
            <div className={styles.secTitle}>รีวิวชื่อผู้ขาย</div>
            <div className={styles.secLink}>ดูทั้งหมด ›</div>
          </div>

          <div className={styles.reviewCard}>
            <div className={styles.reviewRow}>
              <div className={styles.reviewLeft}>
                <img
                  className={styles.rDot}
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                />

                <div>
                  <div className={styles.rName}>มินนี่</div>
                  <div className={styles.rSub}>ประทับใจมาก</div>
                </div>
              </div>

              <div className={styles.stars}>★★★★☆</div>
            </div>

            <div className={styles.reviewRow}>
              <div className={styles.reviewLeft}>
                <img
                  className={styles.rDot}
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                />

                <div>
                  <div className={styles.rName}>ก้องภพ</div>
                  <div className={styles.rSub}>แพ็คดี ส่งไว</div>
                </div>
              </div>

              <div className={styles.stars}>★★★★★</div>
            </div>

            <div className={styles.reviewRow}>
              <div className={styles.reviewLeft}>
                <img
                  className={styles.rDot}
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                />

                <div>
                  <div className={styles.rName}>พลอยใส</div>
                  <div className={styles.rSub}>คุณภาพดี</div>
                </div>
              </div>

              <div className={styles.stars}>★★★★★</div>
            </div>
          </div>
        </div>

        {/* GUIDE */}

        <div className={styles.sec}>
          <div className={styles.secHead}>
            <div className={styles.secTitle}>วิธีทำคะแนนของสมาชิกในระบบ</div>

            <div className={styles.secLink}>ดูทั้งหมด ›</div>
          </div>

          <div className={styles.guideCard}>
            <div className={styles.guideBox}>กราฟที่ “แสดงรายงาน”</div>

            <button className={styles.guideBtn}>แสดงรายงาน</button>

            <div className={styles.guideNote}>
              บันทึก: คะแนนจะอัปเดตตามยอดขายและการรีวิวของลูกค้า
              ระบบจะคำนวณเป็นรายเดือน โดยอิงจากคำสั่งซื้อที่ชำระเงินสำเร็จ
            </div>
          </div>
        </div>

        {/* INFO IMAGE */}

        <div className={styles.infoSection}>
          <img src="https://img5.pic.in.th/file/secure-sv1/Info_Rich_Menu-01.jpg" />
        </div>
      </div>

      <Tabbar />
    </div>
  );
}
